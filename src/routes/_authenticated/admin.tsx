import { createFileRoute } from "@tanstack/react-router";
import { Users, Package, GraduationCap, Cpu, Leaf, Trophy, Activity } from "lucide-react";
import {
  BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, Legend, LineChart, Line,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader, StatCard } from "@/components/page-bits";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/_authenticated/admin")({ component: AdminDashboard });

const trend = [
  { m: "Jan", resources: 18, mentorship: 12, knowledge: 8 },
  { m: "Feb", resources: 26, mentorship: 18, knowledge: 14 },
  { m: "Mar", resources: 31, mentorship: 22, knowledge: 20 },
  { m: "Apr", resources: 40, mentorship: 30, knowledge: 28 },
  { m: "May", resources: 48, mentorship: 36, knowledge: 38 },
  { m: "Jun", resources: 56, mentorship: 42, knowledge: 48 },
];

const departmentData = [
  { name: "Computer Eng", value: 42 },
  { name: "IT", value: 28 },
  { name: "Electronics", value: 18 },
  { name: "Mechanical", value: 14 },
  { name: "Civil", value: 9 },
  { name: "Electrical", value: 17 },
];
const COLORS = ["#4F46E5", "#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EC4899"];

function AdminDashboard() {
  const { data: profiles } = useQuery({
    queryKey: ["all-profiles"],
    queryFn: async () => (await supabase.from("profiles").select("*").limit(20)).data ?? [],
  });

  return (
    <>
      <PageHeader title="Admin Dashboard" subtitle="Campus-wide insights and user management." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Total Users" value={128} delta="+12 this week" accent="from-indigo-500 to-violet-500" />
        <StatCard icon={Package} label="Resources Shared" value={56} delta="+8" accent="from-violet-500 to-fuchsia-500" />
        <StatCard icon={Cpu} label="Components Borrowed" value={150} delta="+24" accent="from-blue-500 to-indigo-500" />
        <StatCard icon={GraduationCap} label="Mentorship Sessions" value={42} delta="+5" accent="from-emerald-500 to-teal-500" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="card-soft p-6 lg:col-span-2">
          <h2 className="mb-1 text-base font-semibold">Activity Trend</h2>
          <p className="text-xs text-muted-foreground mb-3">Resources, mentorship, and knowledge over time</p>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={trend} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="resources" stroke="#8B5CF6" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="mentorship" stroke="#4F46E5" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="knowledge" stroke="#10B981" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-soft p-6">
          <h2 className="mb-1 text-base font-semibold">Department Participation</h2>
          <p className="text-xs text-muted-foreground mb-3">Active users by department</p>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={departmentData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
                  {departmentData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="card-soft p-6">
          <h2 className="mb-3 text-base font-semibold">Skill Distribution</h2>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={[{n:"Programming",v:80},{n:"Web",v:65},{n:"AI/ML",v:58},{n:"Hardware",v:48},{n:"Soft Skills",v:72}]} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="n" tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Bar dataKey="v" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card-soft p-6">
          <h2 className="mb-3 text-base font-semibold">Placement Readiness</h2>
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={[{name:"Ready",value:46},{name:"Improving",value:38},{name:"Beginning",value:16}]} dataKey="value" nameKey="name" outerRadius={80}>
                  <Cell fill="#10B981" /><Cell fill="#3B82F6" /><Cell fill="#F59E0B" />
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card-soft p-6 space-y-3">
          <h2 className="text-base font-semibold">Highlights</h2>
          {[
            { l: "AI Career Readiness Avg", v: "74%", i: Activity },
            { l: "Active Alumni", v: "38", i: GraduationCap },
            { l: "Carbon Saved (mo)", v: "95 kg", i: Leaf },
            { l: "Top Domain", v: "Full-stack Dev", i: Trophy },
          ].map(h => (
            <div key={h.l} className="flex items-center justify-between rounded-xl border border-border p-3">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-primary"><h.i className="h-4 w-4" /></div>
                <div className="text-sm">{h.l}</div>
              </div>
              <div className="font-semibold">{h.v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 card-soft p-4 md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold">User Management</h2>
          <span className="text-xs text-muted-foreground">{profiles?.length ?? 0} users</span>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(profiles ?? []).map(p => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-8 w-8"><AvatarFallback className="gradient-brand text-xs text-primary-foreground">{(p.full_name || "?").slice(0,2).toUpperCase()}</AvatarFallback></Avatar>
                      <span className="font-medium">{p.full_name || "(unnamed)"}</span>
                    </div>
                  </TableCell>
                  <TableCell>{p.department || "—"}</TableCell>
                  <TableCell className="text-muted-foreground">{p.email}</TableCell>
                  <TableCell><span className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">Active</span></TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" className="rounded-lg">View</Button>
                      <Button size="sm" variant="outline" className="rounded-lg">Suspend</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
