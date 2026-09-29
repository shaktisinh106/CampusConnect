import { createFileRoute } from "@tanstack/react-router";
import { Trophy, Award } from "lucide-react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/page-bits";

export const Route = createFileRoute("/_authenticated/gamification")({ component: GamificationPage });

const rules = [
  { action: "Upload Notes", points: 10 },
  { action: "Upload Project Report", points: 20 },
  { action: "Share Internship Experience", points: 25 },
  { action: "Provide Mentorship", points: 15 },
  { action: "Donate Resource", points: 20 },
  { action: "Donate Component", points: 30 },
];

const badges = [
  { e: "📚", n: "Knowledge Champion", d: "Uploaded 25+ documents" },
  { e: "🤝", n: "Mentor Leader", d: "Hosted 10+ sessions" },
  { e: "🌱", n: "Green Contributor", d: "100+ reuse points" },
  { e: "♻", n: "Sustainability Ambassador", d: "Top 5 in eco-impact" },
  { e: "🏆", n: "Campus Impact Leader", d: "Across all categories" },
];

const top = {
  knowledge: [
    { n: "Aditi Rao", v: 412 }, { n: "Sanya Kapoor", v: 365 }, { n: "Vikram Joshi", v: 289 }, { n: "Rahul Bansal", v: 240 },
  ],
  mentors: [
    { n: "Priya Sharma", v: 28 }, { n: "Sneha Iyer", v: 22 }, { n: "Neha Singh", v: 18 }, { n: "Rohit Patel", v: 15 },
  ],
  sustainability: [
    { n: "Riya Sharma", v: 320 }, { n: "Karan Verma", v: 285 }, { n: "Sneha M.", v: 240 }, { n: "Aman Verma", v: 198 },
  ],
};

function Leaderboard({ title, data, unit }: { title: string; data: { n: string; v: number }[]; unit: string }) {
  return (
    <div className="card-soft p-6">
      <h3 className="text-base font-semibold">{title}</h3>
      <ol className="mt-4 space-y-2">
        {data.map((d, i) => (
          <li key={d.n} className="flex items-center justify-between rounded-xl border border-border p-3">
            <div className="flex items-center gap-3">
              <div className={`grid h-8 w-8 place-items-center rounded-lg font-bold text-primary-foreground ${i === 0 ? "bg-warning" : i === 1 ? "bg-muted-foreground" : "gradient-brand"}`}>{i + 1}</div>
              <span className="font-medium">{d.n}</span>
            </div>
            <span className="text-sm font-semibold">{d.v} {unit}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function GamificationPage() {
  const myScore = 245;
  return (
    <>
      <PageHeader title="Knowledge Legacy & Gamification" subtitle="Earn points for what you contribute. Unlock badges. Climb the leaderboard." />

      <div className="card-soft p-6 gradient-brand text-primary-foreground mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider opacity-90">Your Legacy Score</div>
            <div className="mt-1 text-5xl font-bold">{myScore}</div>
            <div className="mt-1 text-sm opacity-90">Top 8% of your batch • 3 badges unlocked</div>
          </div>
          <Trophy className="h-16 w-16 opacity-60" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <div className="card-soft p-6">
          <h2 className="text-base font-semibold">Point System</h2>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {rules.map(r => (
              <div key={r.action} className="rounded-xl border border-border p-3 flex items-center justify-between">
                <span className="text-sm">{r.action}</span>
                <span className="font-bold text-primary">+{r.points}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card-soft p-6">
          <h2 className="text-base font-semibold flex items-center gap-2"><Award className="h-4 w-4" />Achievement Badges</h2>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {badges.map((b, i) => (
              <motion.div key={b.n} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-4 text-center">
                <div className="text-3xl">{b.e}</div>
                <div className="mt-1 text-xs font-semibold">{b.n}</div>
                <div className="text-[10px] text-muted-foreground">{b.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Leaderboard title="🏅 Top Knowledge Contributors" data={top.knowledge} unit="downloads" />
        <Leaderboard title="🤝 Top Mentors" data={top.mentors} unit="sessions" />
        <Leaderboard title="🌱 Top Sustainability" data={top.sustainability} unit="pts" />
      </div>
    </>
  );
}
