import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Briefcase, TrendingUp, Target } from "lucide-react";
import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { PageHeader, StatCard } from "@/components/page-bits";
import { useAuth, displayName } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated/career")({ component: CareerTwin });

const careers = [
  { title: "Software Developer", match: 86, color: "from-indigo-500 to-violet-500" },
  { title: "Data Analyst", match: 78, color: "from-blue-500 to-indigo-500" },
  { title: "AI Engineer", match: 72, color: "from-violet-500 to-fuchsia-500" },
  { title: "Embedded Engineer", match: 64, color: "from-emerald-500 to-teal-500" },
];

const growth = [
  { m: "Jan", v: 55 }, { m: "Feb", v: 60 }, { m: "Mar", v: 64 },
  { m: "Apr", v: 70 }, { m: "May", v: 74 }, { m: "Jun", v: 78 },
];

function CareerTwin() {
  const { user, profile } = useAuth();
  const name = displayName(profile, user);
  const score = 78;

  return (
    <>
      <PageHeader
        title={<>AI Career Twin <Sparkles className="inline h-6 w-6 text-primary-glow" /></>}
        subtitle={`Personalized career guidance for ${name}, powered by your campus contribution data.`}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="card-soft p-6 md:col-span-1 gradient-brand text-primary-foreground">
          <div className="text-xs uppercase tracking-wider opacity-90">Career Readiness</div>
          <div className="mt-2 flex items-end gap-2">
            <div className="text-5xl font-bold">{score}%</div>
            <div className="pb-1 text-xs opacity-80">+6 this month</div>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/20">
            <motion.div initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ duration: 1.2 }} className="h-full bg-white" />
          </div>
          <div className="mt-3 text-xs opacity-90">You're trending towards top 20% of your cohort.</div>
        </div>
        <StatCard icon={Briefcase} label="Internship Probability" value="72%" delta="+8%" accent="from-blue-500 to-indigo-500" />
        <StatCard icon={TrendingUp} label="Placement Probability" value="81%" delta="+11%" accent="from-emerald-500 to-teal-500" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="card-soft p-6">
          <h2 className="text-base font-semibold flex items-center gap-2"><Target className="h-4 w-4" /> Recommended Career Paths</h2>
          <div className="mt-4 space-y-3">
            {careers.map((c, i) => (
              <div key={c.title} className="rounded-2xl border border-border p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{c.title}</span>
                  <span className="text-muted-foreground">{c.match}% match</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-accent">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${c.match}%` }} transition={{ duration: 1, delay: i * 0.1 }} className={`h-full bg-gradient-to-r ${c.color}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-soft p-6">
          <h2 className="text-base font-semibold">Skill Gap & Roadmap</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="rounded-xl border border-border p-3">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Current strength</div>
              <div className="font-medium">Python, JavaScript, React fundamentals</div>
            </div>
            <div className="rounded-xl border border-warning/30 bg-warning/5 p-3">
              <div className="text-xs uppercase tracking-wider text-warning mb-1">Missing for top roles</div>
              <div className="font-medium">SQL · Advanced DSA · Power BI · System Design</div>
            </div>
            <div className="rounded-xl border border-success/30 bg-success/5 p-3">
              <div className="text-xs uppercase tracking-wider text-success mb-1">Next 4 weeks</div>
              <ol className="mt-1 list-decimal pl-5 space-y-0.5">
                <li>Complete SQL bootcamp (10h)</li>
                <li>Solve 30 DSA problems on patterns you've avoided</li>
                <li>Ship one full-stack project with auth + DB</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 card-soft p-6">
        <h2 className="text-base font-semibold mb-3">Career Growth Trend</h2>
        <div className="h-64">
          <ResponsiveContainer>
            <LineChart data={growth} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} domain={[40, 100]} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              <Line type="monotone" dataKey="v" stroke="var(--color-primary)" strokeWidth={3} dot={{ fill: "var(--color-primary)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
