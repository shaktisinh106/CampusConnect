import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Users, Package, Cpu, BookOpen, Sparkles, ArrowRight,
  GraduationCap, Search, Upload, UserPlus,
} from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Area, AreaChart } from "recharts";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, displayName } from "@/lib/auth";
import { PageHeader, Section, StatCard } from "@/components/page-bits";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/_authenticated/dashboard")({ component: Dashboard });

const chartData = [
  { m: "Jan", v: 32 }, { m: "Feb", v: 48 }, { m: "Mar", v: 41 },
  { m: "Apr", v: 65 }, { m: "May", v: 72 }, { m: "Jun", v: 96 },
];

function Dashboard() {
  const { user, profile } = useAuth();
  const name = displayName(profile, user);

  const { data: counts } = useQuery({
    queryKey: ["dashboard-counts"],
    queryFn: async () => {
      const [r, c, k, a] = await Promise.all([
        supabase.from("resources").select("id", { count: "exact", head: true }),
        supabase.from("components").select("id", { count: "exact", head: true }),
        supabase.from("knowledge_documents").select("id", { count: "exact", head: true }),
        supabase.from("activities").select("*").order("created_at", { ascending: false }).limit(8),
      ]);
      return {
        resources: r.count ?? 56,
        components: c.count ?? 150,
        knowledge: k.count ?? 87,
        activities: a.data ?? [],
      };
    },
  });

  const seedActivity = [
    { actor_name: "Riya Sharma", action: "shared a resource", target: "Data Structures Notes" },
    { actor_name: "Aman Verma", action: "booked a mentorship session", target: "with Priya Sharma" },
    { actor_name: "Lab Inventory", action: "added a new component", target: "ESP32 DevKit (×5)" },
    { actor_name: "Sneha Iyer", action: "uploaded a knowledge document", target: "Product Management 101" },
    { actor_name: "Karan Verma", action: "donated to component bank", target: "Servo Motor SG90" },
  ];
  const activities = counts?.activities?.length ? counts.activities : seedActivity;

  return (
    <>
      <PageHeader
        title={<>Welcome, {name} <span className="inline-block">👋</span></>}
        subtitle="Let's build a smarter and sustainable campus together."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Active Users" value={128} delta="+12% this week" trend={[30,45,40,60,55,70,65,80,75,90]} accent="from-indigo-500 to-violet-500" />
        <StatCard icon={Package} label="Resources Shared" value={counts?.resources ?? 56} delta="+8% this week" trend={[20,30,28,45,40,55,60,52,68,75]} accent="from-violet-500 to-fuchsia-500" />
        <StatCard icon={GraduationCap} label="Mentorship Sessions" value={42} delta="+5% this week" trend={[10,18,25,22,30,35,40,38,45,52]} accent="from-blue-500 to-indigo-500" />
        <StatCard icon={BookOpen} label="Knowledge Documents" value={counts?.knowledge ?? 87} delta="+15% this week" trend={[15,22,30,28,40,45,55,60,72,80]} accent="from-emerald-500 to-teal-500" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="card-soft p-6 lg:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Platform Overview</h2>
              <p className="text-xs text-muted-foreground">Activity growth across the campus</p>
            </div>
            <div className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">+24% MoM</div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <AreaChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="v" stroke="var(--color-primary)" strokeWidth={2.5} fill="url(#g)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-soft p-6">
          <h2 className="text-base font-semibold">Recent Activity</h2>
          <p className="text-xs text-muted-foreground">What's happening on campus</p>
          <ul className="mt-4 space-y-3">
            {activities.slice(0, 6).map((a: { actor_name: string; action: string; target: string | null }, i: number) => {
              const init = a.actor_name.split(" ").map(p => p[0]).slice(0, 2).join("");
              return (
                <motion.li key={i} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className="flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-accent">
                  <Avatar className="h-8 w-8"><AvatarFallback className="gradient-brand text-xs text-primary-foreground">{init}</AvatarFallback></Avatar>
                  <div className="min-w-0 text-sm">
                    <span className="font-semibold">{a.actor_name}</span>{" "}
                    <span className="text-muted-foreground">{a.action}</span>{" "}
                    {a.target && <span className="font-medium">{a.target}</span>}
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>

      <Section title="Quick Access">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { to: "/mentorship", title: "Find Mentor", icon: Search, gradient: "from-indigo-500 to-violet-500" },
            { to: "/resources", title: "Share Resource", icon: Package, gradient: "from-violet-500 to-fuchsia-500" },
            { to: "/components", title: "Borrow Component", icon: Cpu, gradient: "from-blue-500 to-indigo-500" },
            { to: "/knowledge", title: "Upload Notes", icon: Upload, gradient: "from-emerald-500 to-teal-500" },
          ].map((q) => (
            <Link key={q.to} to={q.to} className="group card-soft p-5 transition-all hover:-translate-y-0.5 hover:shadow-glow">
              <div className={`mb-3 inline-grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${q.gradient} text-white shadow-soft`}>
                <q.icon className="h-5 w-5" />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">{q.title}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
