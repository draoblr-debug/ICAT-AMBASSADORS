import { useAuth } from "../lib/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Users, Send, CheckCircle, BarChart3, TrendingUp, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

function StatCard({ title, value, icon: Icon, description }: { title: string, value: string | number, icon: any, description: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function DashboardOverview() {
  const { profile } = useAuth();
  const [stats, setStats] = useState({
    totalPosts: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
    leads: 0,
    conversions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;
    
    async function loadStats() {
      try {
        const subsRef = collection(db, "submissions");
        let q;
        const adminRoles = ['hod', 'admin', 'superadmin', 'HOD', 'System Administrator', 'Education Manager', 'Dean'];
        if (profile?.role && adminRoles.includes(profile.role)) {
           q = query(subsRef); // Admin sees all (Wait, rule says staff can read all, this evaluates ok)
        } else {
           q = query(subsRef, where("creatorId", "==", profile?.userId));
        }
        
        const snap = await getDocs(q);
        let approved = 0;
        let pending = 0;
        let rejected = 0;

        snap.forEach(doc => {
          const d = doc.data() as any;
          if (d.status === 'approved') approved++;
          else if (d.status === 'pending') pending++;
          else if (d.status === 'rejected') rejected++;
        });

        // Load leads & conversions dynamically
        const leadsRef = collection(db, "leads");
        let leadsQ;
        if (profile?.role && adminRoles.includes(profile.role)) {
           leadsQ = query(leadsRef);
        } else {
           leadsQ = query(leadsRef, where("creatorId", "==", profile?.userId));
        }
        
        const leadsSnap = await getDocs(leadsQ);
        let leadsCount = leadsSnap.size;
        let conversionsCount = 0;
        
        leadsSnap.forEach(doc => {
          const d = doc.data() as any;
          if (d.status === 'Admitted' || d.status === 'Converted') conversionsCount++;
        });

        setStats({
          totalPosts: snap.size,
          approved,
          pending,
          rejected,
          leads: leadsCount,
          conversions: conversionsCount
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, "submissions");
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, [profile]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Overview</h1>
          <p className="text-gray-500">Welcome back, {profile?.name}</p>
        </div>
        {['student', 'faculty', 'Student', 'Tutor'].includes(profile?.role || '') ? (
          <Link to="/submit">
            <Button>Submit Content</Button>
          </Link>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Posts" value={stats.totalPosts} icon={Send} description="All time submissions" />
        <StatCard title="Approved" value={stats.approved} icon={CheckCircle} description="Live campaigns" />
        <StatCard title="Total Leads" value={stats.leads} icon={Users} description="From affiliate links" />
        <StatCard title="Conversions" value={stats.conversions} icon={TrendingUp} description="Successful admissions" />
      </div>

      {['student', 'faculty', 'Student', 'Tutor'].includes(profile?.role || '') && stats.pending > 0 && (
        <Card className="bg-yellow-50 border-yellow-200">
           <CardContent className="flex items-center p-4">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-4" />
              <div className="text-sm text-yellow-800">
                You have {stats.pending} post(s) pending review. Check the <Link to="/submissions" className="font-medium underline">submissions tab</Link> for updates.
              </div>
           </CardContent>
        </Card>
      )}
      
      {/* Visual Analytics Placeholder */}
      <h2 className="text-xl font-semibold mt-12 mb-4">Performance</h2>
      <Card>
        <CardContent className="h-64 flex items-center justify-center text-gray-400">
          Analytics charts loading...
        </CardContent>
      </Card>
    </div>
  );
}
