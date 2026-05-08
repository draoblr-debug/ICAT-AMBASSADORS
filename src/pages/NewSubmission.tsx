import React, { useState } from "react";
import { useAuth } from "../lib/AuthContext";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function NewSubmission() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [platform, setPlatform] = useState("Instagram");
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [campaign, setCampaign] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setLoading(true);

    try {
      const submissionId = crypto.randomUUID();
      const now = new Date().toISOString();
      const payload = {
        creatorId: profile.userId,
        creatorName: profile.name,
        department: profile.department || "General",
        platform,
        url,
        caption,
        campaign,
        description,
        status: "pending",
        affiliateCode: null,
        feedback: null,
        createdAt: now,
        updatedAt: now,
        leadsGenerated: 0,
        conversions: 0
      };

      await setDoc(doc(db, "submissions", submissionId), payload);
      navigate("/submissions");
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, "submissions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Submit Content</h1>
        <p className="text-gray-500">Add your social media post for approval to generate an affiliate link.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
             <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Creation Platform</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                >
                  {["Instagram", "LinkedIn", "YouTube", "TikTok", "X", "Facebook"].map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
             </div>

             <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Post URL</label>
                <Input 
                  type="url" 
                  placeholder="https://instagram.com/p/..." 
                  required 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
             </div>

             <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Caption / Title</label>
                <Input 
                  placeholder="Creative title of the post..." 
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
             </div>

             <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Campaign Tag (Optional)</label>
                <Input 
                  placeholder="e.g. SummerAdmissions2026" 
                  value={campaign}
                  onChange={(e) => setCampaign(e.target.value)}
                />
             </div>

             <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Short Description</label>
                <textarea 
                  className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  placeholder="Briefly describe the content..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={500}
                />
             </div>

             <div className="pt-4 flex justify-end space-x-2">
                <Button variant="outline" type="button" onClick={() => navigate(-1)}>Cancel</Button>
                <Button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit for Approval"}</Button>
             </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
