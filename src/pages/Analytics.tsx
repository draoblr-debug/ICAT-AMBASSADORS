import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";

const data = [
  { name: 'Instagram', leads: 400 },
  { name: 'YouTube', leads: 300 },
  { name: 'LinkedIn', leads: 200 },
  { name: 'TikTok', leads: 578 },
  { name: 'Facebook', leads: 189 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Analytics</h1>
        <p className="text-gray-500">Performance insights by platform and creator.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Platform Performance (Mock)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
                <Bar dataKey="leads" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leaderboard (Mock)</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                {[
                  { name: "Rahul K.", dept: "Film Making", score: 1420 },
                  { name: "Sneha M.", dept: "Animation", score: 950 },
                  { name: "Vikram P.", dept: "Game Design", score: 820 },
                ].map((item, idx) => (
                  <div key={item.name} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <div className="flex items-center space-x-4">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                        idx === 1 ? 'bg-gray-200 text-gray-700' :
                        idx === 2 ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.dept}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{item.score}</div>
                      <div className="text-xs text-gray-500">Points</div>
                    </div>
                  </div>
                ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
