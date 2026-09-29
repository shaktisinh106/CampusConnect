import { createFileRoute } from "@tanstack/react-router";
import { Leaf, Recycle, IndianRupee, Wind, Trash2, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, AreaChart, Area } from "recharts";
import { PageHeader, StatCard } from "@/components/page-bits";

export const Route = createFileRoute("/_authenticated/sustainability")({ component: SustainabilityPage });

const reuseTrend = [
  { m: "Jan", v: 32 }, { m: "Feb", v: 48 }, { m: "Mar", v: 65 },
  { m: "Apr", v: 80 }, { m: "May", v: 102 }, { m: "Jun", v: 150 },
];
const carbon = [
  { m: "Jan", v: 22 }, { m: "Feb", v: 38 }, { m: "Mar", v: 52 },
  { m: "Apr", v: 65 }, { m: "May", v: 82 }, { m: "Jun", v: 95 },
];

const leaders = [
  { name: "Riya Sharma", badge: "🌱 Green Champion", points: 320 },
  { name: "Karan Verma", badge: "♻ Resource Reuse Leader", points: 285 },
  { name: "Sneha M.", badge: "🌍 Sustainability Ambassador", points: 240 },
  { name: "Aman Verma", badge: "🌱 Green Champion", points: 198 },
];

function SustainabilityPage() {
  return (
    <>
      <PageHeader title="Sustainability Impact" subtitle="Real environmental and economic impact your campus is creating." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatCard icon={IndianRupee} label="Money Saved" value="₹75,000" delta="+12%" accent="from-emerald-500 to-teal-500" />
        <StatCard icon={Recycle} label="Resources Reused" value={320} delta="+24" accent="from-blue-500 to-indigo-500" />
        <StatCard icon={Leaf} label="Components Reused" value={150} delta="+18" accent="from-indigo-500 to-violet-500" />
        <StatCard icon={Trash2} label="Waste Prevented (kg)" value={120} delta="+8" accent="from-violet-500 to-fuchsia-500" />
        <StatCard icon={Wind} label="CO₂ Reduced (kg)" value={95} delta="+11" accent="from-amber-500 to-orange-500" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card-soft p-6">
          <h2 className="mb-3 text-base font-semibold">Resource Reuse Trend</h2>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={reuseTrend} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Bar dataKey="v" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card-soft p-6">
          <h2 className="mb-3 text-base font-semibold">Carbon Savings Trend (kg CO₂)</h2>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={carbon} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="v" stroke="#10B981" strokeWidth={2.5} fill="url(#cg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-8 card-soft p-6">
        <h2 className="text-base font-semibold flex items-center gap-2"><Trophy className="h-4 w-4 text-warning" />Sustainability Leaderboard</h2>
        <div className="mt-4 space-y-2">
          {leaders.map((l, i) => (
            <motion.div key={l.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between rounded-xl border border-border p-3">
              <div className="flex items-center gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-lg gradient-brand font-bold text-primary-foreground">{i + 1}</div>
                <div>
                  <div className="font-medium">{l.name}</div>
                  <div className="text-xs text-muted-foreground">{l.badge}</div>
                </div>
              </div>
              <div className="font-bold text-success">{l.points} pts</div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
