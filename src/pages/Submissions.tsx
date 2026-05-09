import { useEffect, useState } from "react";
import { useAuth } from "../lib/AuthContext";
import { collection, query, where, getDocs, doc, updateDoc, orderBy } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { format } from "date-fns";
import { Copy, QrCode, Check, X, ExternalLink } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

type Submission = {
  id: string;
  creatorId: string;
  creatorName: string;
  department: string;
  platform: string;
  url: string;
  caption: string;
  status: 'pending' | 'approved' | 'rejected' | 'changes_requested';
  affiliateCode: string | null;
  feedback: string | null;
  createdAt: string;
  updatedAt: string;
  leadsGenerated: number;
};

export default function Submissions() {
  const { profile } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [qrCodeData, setQrCodeData] = useState<{ id: string, url: string } | null>(null);

  const adminRoles = ['hod', 'admin', 'superadmin'];
  const isAdmin = profile?.role && adminRoles.includes(profile.role);

  const loadSubmissions = async () => {
    try {
      const subsRef = collection(db, "submissions");
      let q;
      if (isAdmin) {
        // HoD/Admin sees all
        q = query(subsRef); // We can optionally add orderBy later, requires composite index if filtering
      } else {
        q = query(subsRef, where("creatorId", "==", profile?.userId));
      }
      
      const snap = await getDocs(q);
      const data: Submission[] = [];
      snap.forEach(doc => {
        data.push({ id: doc.id, ...(doc.data() as any) } as Submission);
      });
      // simple client sort by date descending
      data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      // dynamically fetch leads counts per submission
      const leadsRef = collection(db, "leads");
      let leadsQ;
      if (isAdmin) {
         leadsQ = query(leadsRef);
      } else {
         leadsQ = query(leadsRef, where("creatorId", "==", profile?.userId));
      }
      
      const leadsSnap = await getDocs(leadsQ);
      const leadCounts: Record<string, { total: number, converted: number }> = {};
      
      leadsSnap.forEach(doc => {
        const d = doc.data() as any;
        if (d.submissionId) {
          if (!leadCounts[d.submissionId]) leadCounts[d.submissionId] = { total: 0, converted: 0 };
          leadCounts[d.submissionId].total += 1;
          if (d.status === 'Admitted' || d.status === 'Converted') {
            leadCounts[d.submissionId].converted += 1;
          }
        }
      });
      
      data.forEach(sub => {
         const count = leadCounts[sub.id];
         if (count) {
            sub.leadsGenerated = count.total;
            (sub as any).conversions = count.converted;
         } else {
            sub.leadsGenerated = 0;
            (sub as any).conversions = 0;
         }
      });

      setSubmissions(data);
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, "submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profile) loadSubmissions();
  }, [profile]);

  const handleStatusUpdate = async (id: string, newStatus: string, department: string) => {
    try {
      let affiliateCode = null;
      if (newStatus === 'approved') {
         // Generate unique short code
         const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
         const deptPrefix = department.substring(0, 3).toUpperCase();
         affiliateCode = `ICAT-${deptPrefix}-${rand}`;
      }
      
      const ref = doc(db, "submissions", id);
      await updateDoc(ref, {
        status: newStatus,
        ...(affiliateCode && { affiliateCode }),
        updatedAt: new Date().toISOString()
      });
      loadSubmissions();
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `submissions/${id}`);
    }
  };

  const getAffiliateUrl = (code: string) => {
    return `https://www.icat.ac.in/student_application_form/default.aspx?ref=${code}`;
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('Copied to clipboard!');
  };

  if (loading) return <div>Loading submissions...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <h1 className="text-2xl font-bold tracking-tight text-gray-900">Content Submissions</h1>
      </div>

      <div className="space-y-4">
        {submissions.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              No submissions found.
            </CardContent>
          </Card>
        ) : (
          submissions.map((sub) => (
            <Card key={sub.id} className="overflow-hidden">
               <div className="md:flex">
                 <div className="p-6 md:w-2/3 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {sub.platform}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                          sub.status === 'approved' ? 'bg-green-100 text-green-800' :
                          sub.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {sub.status.replace('_', ' ')}
                        </span>
                      </div>
                      
                      <a href={sub.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-600 hover:underline flex items-center mb-1">
                         {sub.caption || "Untitled Content"}
                         <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                      
                      <div className="text-sm text-gray-500 mb-4">
                        Submitted by <span className="font-medium text-gray-900">{sub.creatorName}</span> • {sub.department} • {format(new Date(sub.createdAt), 'MMM d, yyyy')}
                      </div>
                    </div>

                    {isAdmin && sub.status === 'pending' && (
                      <div className="flex space-x-2 mt-4">
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleStatusUpdate(sub.id, 'approved', sub.department)}
                        >
                          <Check className="h-4 w-4 mr-1"/> Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => handleStatusUpdate(sub.id, 'rejected', sub.department)}
                        >
                          <X className="h-4 w-4 mr-1"/> Reject
                        </Button>
                      </div>
                    )}
                 </div>

                 <div className="p-6 bg-gray-50 flex-1 flex flex-col justify-center items-center text-center">
                    {sub.status === 'approved' && sub.affiliateCode ? (
                      <div className="w-full">
                        <p className="text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Tracking Code</p>
                        <div className="text-xl font-bold font-mono text-gray-900 mb-4">{sub.affiliateCode}</div>
                        
                        <div className="grid grid-cols-2 gap-2 w-full max-w-[240px] mx-auto">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full text-xs" 
                            onClick={() => handleCopy(getAffiliateUrl(sub.affiliateCode!))}
                          >
                            <Copy className="h-3 w-3 mr-1.5" /> Copy Link
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full text-xs"
                            onClick={() => setQrCodeData({ id: sub.id, url: getAffiliateUrl(sub.affiliateCode!) })}
                          >
                            <QrCode className="h-3 w-3 mr-1.5" /> View QR
                          </Button>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 text-center">
                           <div>
                             <div className="text-xs text-gray-500">Leads</div>
                             <div className="font-semibold">{sub.leadsGenerated || 0}</div>
                           </div>
                           <div>
                             <div className="text-xs text-gray-500">Converted</div>
                             <div className="font-semibold text-green-600">{(sub as any).conversions || 0}</div>
                           </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">
                        {sub.status === 'pending' ? "Link will be generated upon approval." : "Content not approved."}
                      </div>
                    )}
                 </div>
               </div>
            </Card>
          ))
        )}
      </div>

      {qrCodeData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setQrCodeData(null)}>
           <div className="bg-white p-8 rounded-xl shadow-xl flex flex-col items-center" onClick={e => e.stopPropagation()}>
              <h3 className="text-lg font-bold mb-6 text-gray-900">Share QR Code</h3>
              <div className="bg-white p-4 border border-gray-200 rounded-xl mb-6">
                 <QRCodeSVG value={qrCodeData.url} size={200} />
              </div>
              <p className="text-sm font-mono text-gray-600 mb-6 truncate max-w-[250px]">{qrCodeData.url}</p>
              <Button onClick={() => setQrCodeData(null)} variant="outline" className="w-full">Close</Button>
           </div>
        </div>
      )}
    </div>
  );
}
