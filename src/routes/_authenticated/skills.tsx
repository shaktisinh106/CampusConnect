import { createFileRoute } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/page-bits";

export const Route = createFileRoute("/_authenticated/skills")({ component: SkillsPage });

const monthly = [
  { m: "Jan", v: 40 }, { m: "Feb", v: 48 }, { m: "Mar", v: 52 },
  { m: "Apr", v: 58 }, { m: "May", v: 64 }, { m: "Jun", v: 72 },
];
const skills = [
  { name: "Programming", v: 80, color: "from-indigo-500 to-violet-500" },
  { name: "Web Development", v: 65, color: "from-blue-500 to-indigo-500" },
  { name: "Problem Solving", v: 70, color: "from-violet-500 to-fuchsia-500" },
  { name: "Communication", v: 60, color: "from-amber-500 to-orange-500" },
  { name: "Teamwork", v: 85, color: "from-emerald-500 to-teal-500" },
];
const recs = ["Python Advanced Course", "DSA Daily Practice", "Communication Workshop", "Full-stack Web Dev Roadmap"];

function SkillsPage() {
  const overall = 72;
  const c = 2 * Math.PI * 70;
  return (
    <>
      <PageHeader title="Skill Gap Analytics" subtitle="Understand where you stand. Get a personalized roadmap to grow." />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-soft p-6 lg:col-span-1 grid place-items-center">
          <div className="relative grid place-items-center">
            <svg width="180" height="180" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="70" stroke="var(--color-border)" strokeWidth="14" fill="none" />
              <motion.circle cx="80" cy="80" r="70" stroke="url(#sg)" strokeWidth="14" fill="none"
                strokeLinecap="round" transform="rotate(-90 80 80)"
                strokeDasharray={c}
                initial={{ strokeDashoffset: c }}
                animate={{ strokeDashoffset: c - (c * overall) / 100 }}
                transition={{ duration: 1.4, ease: "easeOut" }} />
              <defs>
                <linearGradient id="sg" x1="0" x2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" />
                  <stop offset="100%" stopColor="var(--color-primary-glow)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute text-center">
              <div className="text-4xl font-bold">{overall}%</div>
              <div className="text-xs text-muted-foreground">Skill Score</div>
            </div>
          </div>
          <div className="mt-4 text-sm font-medium text-success">Top 25% in your batch</div>
        </div>

        <div className="card-soft p-6 lg:col-span-2">
          <h2 className="text-base font-semibold">Skill Breakdown</h2>
          <div className="mt-5 space-y-4">
            {skills.map((s, i) => (
              <div key={s.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium">{s.name}</span>
                  <span className="text-muted-foreground">{s.v}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-accent">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${s.v}%` }} transition={{ duration: 1, delay: i * 0.1 }}
                    className={`h-full bg-gradient-to-r ${s.color}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="card-soft p-6 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold flex items-center gap-2"><BarChart3 className="h-4 w-4" />Monthly Progress</h2>
            <div className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">+12% MoM</div>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={monthly} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Line type="monotone" dataKey="v" stroke="var(--color-primary)" strokeWidth={3} dot={{ fill: "var(--color-primary)", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card-soft p-6">
          <h2 className="text-base font-semibold">Recommendations</h2>
          <ul className="mt-4 space-y-2.5">
            {recs.map(r => (
              <li key={r} className="flex items-start gap-2 rounded-xl p-2.5 hover:bg-accent transition-colors">
                <div className="mt-1 h-1.5 w-1.5 rounded-full gradient-brand shrink-0" />
                <span className="text-sm">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
