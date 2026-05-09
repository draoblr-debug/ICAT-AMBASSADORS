import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, handleFirestoreError, OperationType } from "../lib/firebase";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { parseUsers } from "../lib/closedEnv";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"student" | "faculty">("student");
  
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const allUsers = useMemo(() => parseUsers(), []);
  
  const students = useMemo(() => allUsers.filter(u => u.role === "Student" || u.role === "student"), [allUsers]);
  const faculty = useMemo(() => allUsers.filter(u => u.role !== "Student" && u.role !== "student"), [allUsers]);

  const availableYears = useMemo(() => {
    const years = students.map(s => String(s.year)).filter(y => y && y !== 'undefined' && y !== 'null');
    return Array.from(new Set<string>(years)).sort((a, b) => a.localeCompare(b));
  }, [students]);

  const availableDepartments = useMemo(() => {
    const depts = students.map(s => s.programId).filter(Boolean) as string[];
    return Array.from(new Set(depts)).sort((a, b) => a.localeCompare(b));
  }, [students]);

  const filteredStudents = useMemo(() => {
    let filtered = students;
    if (selectedYear) {
      filtered = filtered.filter(s => String(s.year) === selectedYear);
    }
    if (selectedDepartment) {
      filtered = filtered.filter(s => s.programId === selectedDepartment);
    }
    return filtered;
  }, [students, selectedYear, selectedDepartment]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserEmail) {
      setError("Please select a user");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }

    const matchedUser = allUsers.find(u => u.email === selectedUserEmail);
    if (!matchedUser) {
      setError("User not found");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Attempt login
      await signInWithEmailAndPassword(auth, selectedUserEmail, password);
      navigate("/");
    } catch (err: any) {
      // If user doesn't exist, try to create them ONLY IF password matches their default ID password
      // Since err.code might be 'auth/invalid-credential', we can't be sure if it's user not found or bad password.
      // So if the password exactly matches the default password, we will attempt to create
      const inputPass = password.trim();
      const defaultPass = matchedUser.password.trim();

      // SECURITY NOTE: Client-side account provisioning using a local CSV of default passwords
      // is a security risk. In a real-world scenario with a backend, this should be handled
      // by a Cloud Function or Admin SDK. We leave it enabled for the preview/demo environment so the app functions.
      if (inputPass === defaultPass || inputPass.toLowerCase() === defaultPass.toLowerCase()) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, selectedUserEmail, inputPass);
          const userId = userCredential.user.uid;
          
          await setDoc(doc(db, "users", userId), {
            userId: userId,
            email: matchedUser.email,
            name: matchedUser.name,
            role: matchedUser.role,
            department: matchedUser.programId || "General",
            collegeId: matchedUser.id,
            year: matchedUser.year || null,
            passwordChanged: false,
            createdAt: new Date().toISOString()
          });
          
          navigate("/");
        } catch (createErr: any) {
          if (createErr.code === 'auth/email-already-in-use') {
            setError("Account already exists (likely from previous Google login). Please click 'Forgot Password' below to set up your password.");
          } else if (createErr.code === 'auth/weak-password') {
            setError("The password must be at least 6 characters long.");
          } else {
             try {
                handleFirestoreError(createErr, OperationType.CREATE, `users`);
             } catch(fe: any) {
                setError(JSON.parse(fe.message).error || "Failed to create profile. " + createErr.message);
             }
          }
        }
      } else {
         setError("Incorrect password. If this is your first time logging in, please use your exact College ID or Employee ID as the password (case-sensitive).");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!selectedUserEmail) {
      setError("Please select a user first to reset your password");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await sendPasswordResetEmail(auth, selectedUserEmail);
      setError("Password reset email sent! Please check your inbox and follow the link to set a new password. If you don't see it, check your spam folder.");
    } catch (err: any) {
      setError("Failed to send reset email: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="text-center pb-6 border-b border-gray-100 flex flex-col items-center">
          <img src="/icat-logo.png" alt="ICAT Logo" className="h-16 object-contain mb-4" referrerPolicy="no-referrer" />
          <CardTitle className="text-2xl font-bold tracking-tight text-blue-900">ICAT Ambassadors</CardTitle>
          <p className="text-sm text-gray-500 mt-2">Sign in to your account</p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
            <button
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                tab === "student" ? "bg-white text-blue-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => { setTab("student"); setSelectedUserEmail(""); setError(""); setPassword(""); }}
            >
              Student
            </button>
            <button
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                tab === "faculty" ? "bg-white text-blue-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => { setTab("faculty"); setSelectedUserEmail(""); setError(""); setPassword(""); }}
            >
              Faculty & Staff
            </button>
          </div>

          {error && <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-100 rounded-md text-sm whitespace-pre-wrap">{error}</div>}
          
          <form onSubmit={handleLogin} className="space-y-4">
             {tab === "student" && (
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <label className="text-sm font-medium text-gray-700">Filter by Year</label>
                   <select
                     value={selectedYear}
                     onChange={(e) => setSelectedYear(e.target.value)}
                     className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                   >
                     <option value="">All Years</option>
                     {availableYears.map(y => (
                       <option key={y} value={y}>Year {y}</option>
                     ))}
                   </select>
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium text-gray-700">Filter by Program</label>
                   <select
                     value={selectedDepartment}
                     onChange={(e) => setSelectedDepartment(e.target.value)}
                     className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                   >
                     <option value="">All Programs</option>
                     {availableDepartments.map(d => (
                       <option key={d} value={d}>{d}</option>
                     ))}
                   </select>
                 </div>
               </div>
             )}

             <div className="space-y-2">
               <label className="text-sm font-medium text-gray-700">Select Name</label>
               <select
                 value={selectedUserEmail}
                 onChange={(e) => setSelectedUserEmail(e.target.value)}
                 className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                 required
               >
                 <option value="" disabled>Select your name</option>
                 {(tab === "student" ? filteredStudents : faculty).sort((a,b) => a.name.localeCompare(b.name)).map(u => (
                   <option key={u.email} value={u.email}>{u.name} ({u.id})</option>
                 ))}
               </select>
             </div>

             <div className="space-y-4">
               <div className="space-y-2">
                 <div className="flex items-center justify-between">
                   <label className="text-sm font-medium text-gray-700">Password</label>
                 </div>
                 <Input
                   type="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder={tab === "student" ? "College ID" : "Employee ID"}
                   required
                 />
                 <div className="text-right">
                   <button
                     type="button"
                     onClick={handleResetPassword}
                     className="text-sm text-blue-600 hover:text-blue-800"
                   >
                     Forgot Password / Setup Password?
                   </button>
                 </div>
               </div>
             </div>

            <Button 
              type="submit" 
              className="w-full mt-2"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
