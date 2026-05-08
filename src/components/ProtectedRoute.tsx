import { ReactNode } from "react";
import { useAuth } from "../lib/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export function ProtectedRoute({ 
  children, 
  allowedRoles 
}: { 
  children: ReactNode;
  allowedRoles?: string[];
}) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in, but no profile document exists, redirect to complete-profile, unless we are already there
  if (!profile && location.pathname !== '/complete-profile') {
    return <Navigate to="/complete-profile" replace />;
  }

  // If roles are specified, ensure the user has one
  if (allowedRoles && profile) {
    if (!allowedRoles.includes(profile.role)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
}
