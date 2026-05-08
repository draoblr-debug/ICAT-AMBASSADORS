import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { useAuth } from "../lib/AuthContext";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Lock } from "lucide-react";

export default function ChangePassword() {
  const { profile, refreshProfile } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No authenticated user");

      // Update password in Firebase Auth
      await updatePassword(user, newPassword);

      // Update profile in Firestore
      if (profile) {
        await updateDoc(doc(db, "users", profile.userId), {
          passwordChanged: true
        });
        await refreshProfile();
      }

      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err: any) {
      if (err.code === 'auth/requires-recent-login') {
        setError("This operation requires a recent login. Please log out and log in again, then try to change your password.");
      } else {
        setError(err.message || "Failed to change password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <Card className="shadow-sm">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto bg-blue-50 text-blue-600 rounded-full h-12 w-12 flex items-center justify-center mb-2">
            <Lock className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl font-bold">Change Password</CardTitle>
          <p className="text-sm text-gray-500 mt-2">
            {profile?.passwordChanged ? "Update your account password." : "Please change your default password to secure your account."}
          </p>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="text-center py-4 text-green-600">
              <p className="font-semibold">Password changed successfully!</p>
              <p className="text-sm mt-1">Redirecting to dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md">{error}</div>}
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">New Password</label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                />
              </div>

              <Button type="submit" className="w-full mt-4" disabled={loading}>
                {loading ? "Changing..." : "Change Password"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
