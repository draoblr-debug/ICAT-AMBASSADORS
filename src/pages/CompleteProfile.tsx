import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db, handleFirestoreError, OperationType } from "../lib/firebase";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { useAuth } from "../lib/AuthContext";
import { parseUsers } from "../lib/closedEnv";

export default function CompleteProfile() {
  const { user, profile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (profile) navigate("/");
  }, [profile, navigate]);

  useEffect(() => {
    const checkAndCompleteProfile = async () => {
      if (!user) return;
      if (!user.email) {
        setError("No email found for this user.");
        setLoading(false);
        return;
      }

      setError("");
      
      const allowedUsers = parseUsers();
      const userEmail = user.email.toLowerCase();
      const matchedUser = allowedUsers.find(u => u.email === userEmail);

      if (!matchedUser) {
        setError("Your email is not recognized in our system. You do not have access to this application.");
        setLoading(false);
        return;
      }

      try {
        await setDoc(doc(db, "users", user.uid), {
          userId: user.uid,
          email: matchedUser.email,
          name: matchedUser.name,
          role: matchedUser.role,
          department: matchedUser.programId || "General",
          collegeId: matchedUser.id,
          year: matchedUser.year || null,
          createdAt: new Date().toISOString()
        });
        await refreshProfile();
        navigate("/");
      } catch (err: any) {
        try {
          handleFirestoreError(err, OperationType.CREATE, `users/${user.uid}`);
        } catch (firestoreErr: any) {
          setError(JSON.parse(firestoreErr.message).error || "Failed to save profile");
        }
      } finally {
        setLoading(false);
      }
    };

    if (user && !profile) {
      checkAndCompleteProfile();
    }
  }, [user, profile, navigate, refreshProfile]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-600">Verifying Account</CardTitle>
          <p className="text-sm text-gray-500 mt-2">Please wait while we check your credentials.</p>
        </CardHeader>
        <CardContent>
          {loading && !error && (
            <div className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
          {error && (
            <div className="space-y-4">
              <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">{error}</div>
              <Button onClick={handleLogout} className="w-full">Sign Out and Try Another Account</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
