import { useEffect, useState } from "react";
import { collection, query, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";
import { Card, CardContent } from "../components/ui/Card";
import { format } from "date-fns";

type Lead = {
  id: string;
  submissionId: string;
  creatorId: string;
  name: string;
  email: string;
  phone: string;
  program?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // Example of how we might load leads
  const loadLeads = async () => {
    try {
      const q = query(collection(db, "leads"));
      const snap = await getDocs(q);
      const data: Lead[] = [];
      snap.forEach(d => {
        data.push({ id: d.id, ...d.data() } as Lead);
      });
      data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setLeads(data);
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, "leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const ref = doc(db, "leads", id);
      await updateDoc(ref, {
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
      loadLeads();
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `leads/${id}`);
    }
  };

  if (loading) return <div>Loading pipeline...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <h1 className="text-2xl font-bold tracking-tight text-gray-900">Lead Pipeline</h1>
         {/* Since it's a test app without real external forms, we can simulate an external lead for testing */}
         <button onClick={async () => {
           try {
             await addDoc(collection(db, "leads"), {
               submissionId: "TEST_SUB",
               creatorId: "TEST_CREATOR",
               name: "Test Student",
               email: "test@example.com",
               phone: "9999999999",
               status: 'New Lead',
               createdAt: new Date().toISOString(),
               updatedAt: new Date().toISOString()
             });
             loadLeads();
           } catch(e) { console.error(e) }
         }} className="text-sm text-blue-600 underline">Add Test Lead</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-900">
            <tr>
              <th className="px-6 py-4 font-medium">Lead Name</th>
              <th className="px-6 py-4 font-medium">Programme</th>
              <th className="px-6 py-4 font-medium">Contact</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No leads in the pipeline.</td>
              </tr>
            ) : leads.map(lead => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{lead.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{lead.program || 'N/A'}</td>
                <td className="px-6 py-4">
                  <div className="truncate max-w-[150px]">{lead.email}</div>
                  <div className="text-xs text-gray-400">{lead.phone}</div>
                </td>
                <td className="px-6 py-4">
                  <select 
                    value={lead.status}
                    onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                    className={`block w-full rounded-md border-0 py-1.5 pl-3 pr-8 text-sm ring-1 ring-inset focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                      lead.status === 'New Lead' ? 'bg-blue-50 text-blue-700 ring-blue-200' : 
                      lead.status === 'Admitted' ? 'bg-green-50 text-green-700 ring-green-200' :
                      'bg-gray-50 text-gray-700 ring-gray-200'
                    }`}
                  >
                    <option value="New Lead">New Lead</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Interested">Interested</option>
                    <option value="Campus Visit">Campus Visit</option>
                    <option value="Applied">Applied</option>
                    <option value="Admitted">Admitted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>
                <td className="px-6 py-4">{format(new Date(lead.createdAt), 'MMM d, yyyy')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
