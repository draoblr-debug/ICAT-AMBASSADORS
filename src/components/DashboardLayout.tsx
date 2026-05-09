import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { LayoutDashboard, Send, Users, BarChart3, LogOut, Menu, X, Key } from "lucide-react";
import { cn } from "../lib/utils";

export function DashboardLayout() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // If the user hasn't changed their password yet, and they aren't already on the change-password page, redirect them.
    if (profile && profile.passwordChanged === false && location.pathname !== '/change-password') {
      navigate('/change-password');
    }
  }, [profile, location, navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const navItems = [
    { name: "Overview", path: "/", icon: LayoutDashboard },
    { name: "Submissions", path: "/submissions", icon: Send },
  ];

  const adminRoles = ['hod', 'admin', 'superadmin'];
  if (profile?.role && adminRoles.includes(profile.role)) {
    navItems.push(
      { name: "Leads Pipeline", path: "/leads", icon: Users },
      { name: "Analytics", path: "/analytics", icon: BarChart3 }
    );
  }

  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <img src="/icat-logo.png" alt="ICAT Logo" className="h-10 object-contain" referrerPolicy="no-referrer" />
          <div className="font-bold text-xl tracking-tight text-blue-900 hidden md:block">Ambassadors</div>
        </div>
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <X className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || 
            (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-blue-50 text-blue-700" 
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-200 space-y-2">
        <div className="flex items-center space-x-3 mb-4 px-2">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
            {profile?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium text-gray-900 truncate">{profile?.name}</span>
            <span className="text-xs text-gray-500 capitalize truncate">{profile?.role}</span>
          </div>
        </div>
        <Link 
          to="/change-password"
          className="flex w-full items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <Key className="h-5 w-5" />
          <span>Change Password</span>
        </Link>
        <button 
          onClick={handleLogout}
          className="flex w-full items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign out</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)}></div>
          <aside className="fixed inset-y-0 left-0 flex w-72 flex-col bg-white border-r border-gray-200 z-50">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 md:hidden">
          <div className="flex items-center space-x-2">
            <img src="/icat-logo.png" alt="ICAT Logo" className="h-8 object-contain" referrerPolicy="no-referrer" />
            <div className="font-bold text-lg text-blue-900">Ambassadors</div>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
