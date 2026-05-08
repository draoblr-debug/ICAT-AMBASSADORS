import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './lib/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

import { DashboardLayout } from './components/DashboardLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import CompleteProfile from './pages/CompleteProfile';
import DashboardOverview from './pages/DashboardOverview';
import Apply from './pages/Apply';

import Submissions from './pages/Submissions';
import NewSubmission from './pages/NewSubmission';
import Leads from './pages/Leads';
import Analytics from './pages/Analytics';
import ChangePassword from './pages/ChangePassword';

const Unauthorized = () => <div className="p-8">You don't have access to this page.</div>;

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/complete-profile" element={<ProtectedRoute><CompleteProfile /></ProtectedRoute>} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/apply" element={<Apply />} />
          
          <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<DashboardOverview />} />
            <Route path="submissions" element={<Submissions />} />
            <Route path="submit" element={<NewSubmission />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="leads" element={<ProtectedRoute allowedRoles={['hod', 'admin', 'superadmin', 'HOD', 'System Administrator', 'Education Manager', 'Dean']}><Leads /></ProtectedRoute>} />
            <Route path="analytics" element={<ProtectedRoute allowedRoles={['hod', 'admin', 'superadmin', 'HOD', 'System Administrator', 'Education Manager', 'Dean']}><Analytics /></ProtectedRoute>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

