import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users, Briefcase, Mic, BookOpen, Package, Cpu, Heart, Leaf,
  CalendarPlus, UploadCloud, MessageSquare, ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { useAuth, displayName } from "@/lib/auth";
import { PageHeader, Section, StatCard } from "@/components/page-bits";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/_authenticated/alumni-dashboard")({ component: AlumniDashboard });

const impactData = [
  { m: "Jan", mentor: 2, talks: 0, refer: 1 },
  { m: "Feb", mentor: 3, talks: 1, refer: 2 },
  { m: "Mar", mentor: 5, talks: 1, refer: 3 },
  { m: "Apr", mentor: 4, talks: 2, refer: 4 },
  { m: "May", mentor: 6, talks: 2, refer: 5 },
  { m: "Jun", mentor: 8, talks: 3, refer: 7 },
];

function AlumniDashboard() {
  const { user, profile } = useAuth();
  const name = displayName(profile, user);

  const requests = [
    { name: "Riya Sharma", topic: "Resume review for SDE roles", when: "Today, 5:00 PM" },
    { name: "Aman Verma", topic: "Switching to PM after CS", when: "Tomorrow, 6:30 PM" },
    { name: "Sneha Iyer", topic: "Internship at fintech", when: "Fri, 7:00 PM" },
  ];

  return (
    <>
      <PageHeader
        title={<>Welcome, {name} <span className="inline-block">👋</span></>}
        subtitle="Thank you for supporting the CampusConnect community."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Students Mentored" value={24} delta="+3 this month" accent="from-indigo-500 to-violet-500" />
        <StatCard icon={Briefcase} label="Internship Referrals" value={12} delta="+2" accent="from-violet-500 to-fuchsia-500" />
        <StatCard icon={Mic} label="Career Talks" value={6} delta="+1" accent="from-blue-500 to-indigo-500" />
        <StatCard icon={Heart} label="Community Impact" value={"86%"} delta="Top 10% alumni" accent="from-rose-500 to-pink-500" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="card-soft p-6 lg:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Your Contribution Impact</h2>
              <p className="text-xs text-muted-foreground">Mentorship, talks and referrals over the last 6 months</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <BarChart data={impactData} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Bar dataKey="mentor" stackId="a" fill="#4F46E5" radius={[0, 0, 0, 0]} />
                <Bar dataKey="talks" stackId="a" fill="#8B5CF6" />
                <Bar dataKey="refer" stackId="a" fill="#10B981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-soft p-6">
          <h2 className="text-base font-semibold">Pending Mentorship Requests</h2>
          <p className="text-xs text-muted-foreground">Students waiting on your reply</p>
          <ul className="mt-4 space-y-3">
            {requests.map((r, i) => (
              <motion.li key={r.name} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border p-3">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8"><AvatarFallback className="gradient-brand text-xs text-primary-foreground">
                    {r.name.split(" ").map(p => p[0]).join("")}
                  </AvatarFallback></Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.topic}</div>
                    <div className="text-[11px] text-muted-foreground mt-1">{r.when}</div>
                  </div>
                </div>
                <div className="mt-2.5 flex gap-2">
                  <button className="flex-1 rounded-lg gradient-brand text-primary-foreground text-xs font-semibold py-1.5">Accept</button>
                  <button className="flex-1 rounded-lg border border-border text-xs font-medium py-1.5">Decline</button>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <Section title="Quick Actions" subtitle="Most impactful actions for alumni">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { to: "/mentorship", title: "Accept Mentorship", icon: Users, gradient: "from-indigo-500 to-violet-500" },
            { to: "/referrals", title: "Post Internship", icon: Briefcase, gradient: "from-violet-500 to-fuchsia-500" },
            { to: "/career-talks", title: "Schedule Career Talk", icon: CalendarPlus, gradient: "from-blue-500 to-indigo-500" },
            { to: "/knowledge", title: "Share Experience", icon: UploadCloud, gradient: "from-emerald-500 to-teal-500" },
            { to: "/donations", title: "Donate Resources", icon: Package, gradient: "from-amber-500 to-orange-500" },
            { to: "/donations", title: "Donate Components", icon: Cpu, gradient: "from-cyan-500 to-blue-500" },
            { to: "/alumni", title: "Alumni Directory", icon: Users, gradient: "from-fuchsia-500 to-pink-500" },
            { to: "/sustainability", title: "Sustainability", icon: Leaf, gradient: "from-emerald-500 to-lime-500" },
          ].map((q) => (
            <Link key={q.title} to={q.to} className="group card-soft p-5 transition-all hover:-translate-y-0.5 hover:shadow-glow">
              <div className={`mb-3 inline-grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${q.gradient} text-white shadow-soft`}>
                <q.icon className="h-5 w-5" />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">{q.title}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Recent Contributions">
        <div className="card-soft p-6">
          <ul className="space-y-3">
            {[
              { i: BookOpen, t: "Published 'My SDE-2 interview journey at Google'", d: "2 days ago" },
              { i: Briefcase, t: "Referred Riya Sharma for SDE Intern at Razorpay", d: "5 days ago" },
              { i: Mic, t: "Conducted webinar — 'Breaking into Product Management'", d: "1 week ago" },
              { i: MessageSquare, t: "Answered 4 student questions on Career Twin", d: "2 weeks ago" },
            ].map((a) => (
              <li key={a.t} className="flex items-center justify-between rounded-xl border border-border p-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-primary"><a.i className="h-4 w-4" /></div>
                  <div className="text-sm font-medium">{a.t}</div>
                </div>
                <div className="text-xs text-muted-foreground">{a.d}</div>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
