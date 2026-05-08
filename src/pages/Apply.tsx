import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function Apply() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const refCode = searchParams.get("ref");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [program, setProgram] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [affiliateInfo, setAffiliateInfo] = useState<any>(null);

  useEffect(() => {
    if (refCode) {
      // Find who this affiliate code belongs to
      const resolveAffiliate = async () => {
        const q = query(collection(db, "submissions"), where("affiliateCode", "==", refCode));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const sub = snap.docs[0];
          setAffiliateInfo({ id: sub.id, ...sub.data() });
        }
      };
      resolveAffiliate();
    }
  }, [refCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const now = new Date().toISOString();
      await addDoc(collection(db, "leads"), {
        submissionId: affiliateInfo ? affiliateInfo.id : "organic",
        creatorId: affiliateInfo ? affiliateInfo.creatorId : "organic",
        department: affiliateInfo ? affiliateInfo.department : "General",
        name,
        email,
        phone,
        program,
        status: "New Lead",
        createdAt: now,
        updatedAt: now
      });

      // We will count leads generated dynamically from the leads collection
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Failed to submit application.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md text-center p-8 border-green-200 bg-green-50">
           <h2 className="text-2xl font-bold text-green-700 mb-2">Application Received!</h2>
           <p className="text-gray-600 mb-6">Our admissions team will contact you shortly.</p>
           <Button onClick={() => navigate("/")} className="bg-green-600 hover:bg-green-700 text-white">Back to Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-600">ICAT Admissions</CardTitle>
          <p className="text-sm text-gray-500 mt-2">Apply now to start your creative journey.</p>
          {affiliateInfo && (
            <div className="mt-4 inline-block bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
              Referred by {affiliateInfo.creatorName} ({affiliateInfo.department})
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Student Name"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <Input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91..."
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Programme of Interest</label>
              <select 
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                required
              >
                <option value="">Select Programme</option>
                <option value="B.Sc. Game Design & Development">B.Sc. Game Design & Development</option>
                <option value="B.Sc. Animation">B.Sc. Animation</option>
                <option value="B.Sc. Visual Effects">B.Sc. Visual Effects</option>
                <option value="B.Sc. Film & Television">B.Sc. Film & Television</option>
                <option value="B.Sc. Photography">B.Sc. Photography</option>
                <option value="B.Sc. UI Design & Development">B.Sc. UI Design & Development</option>
                <option value="B.Sc. Interior Design">B.Sc. Interior Design</option>
                <option value="Master's in Media Business">Master's in Media Business</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
