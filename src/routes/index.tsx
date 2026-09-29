import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Users, Package, Cpu, BookOpen, Rocket, Sparkles, ArrowRight,
  GraduationCap, Leaf, Trophy, ShieldCheck, BarChart3, MoveRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CampusConnect — Connect • Share • Grow" },
      { name: "description", content: "A Smart Campus Ecosystem for Mentoring, Sharing Resources, Preserving Knowledge, Improving Employability, and Promoting Sustainability." },
      { property: "og:title", content: "CampusConnect" },
      { property: "og:description", content: "Smart Circular Learning & Innovation Ecosystem for Engineering Colleges." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Users, title: "Mentorship", body: "Learn and grow together — book sessions with senior students and alumni.", color: "from-indigo-500 to-violet-500" },
  { icon: Package, title: "Resources", body: "Share and reuse books, calculators, lab coats and more — save money and waste.", color: "from-violet-500 to-fuchsia-500" },
  { icon: Cpu, title: "Components", body: "Borrow Arduinos, sensors, and lab modules. Build projects sustainably.", color: "from-blue-500 to-indigo-500" },
  { icon: BookOpen, title: "Knowledge", body: "Preserve notes, reports, and internship stories for future batches forever.", color: "from-emerald-500 to-teal-500" },
  { icon: Rocket, title: "Skills", body: "Analyze your skill gaps and get a personalized roadmap to grow.", color: "from-amber-500 to-orange-500" },
  { icon: GraduationCap, title: "Alumni Bridge", body: "Connect with alumni for guidance, referrals, and career talks.", color: "from-pink-500 to-rose-500" },
];

function Counter({ value, label }: { value: number; label: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0; const start = performance.now(); const dur = 1400;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(p * value));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return (
    <div ref={ref} className="card-soft p-6 text-center">
      <div className="text-4xl font-bold tracking-tight gradient-brand-text">{n}</div>
      <div className="mt-1 text-sm font-medium text-muted-foreground">{label}</div>
    </div>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl gradient-brand">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="text-base font-bold tracking-tight">CampusConnect</div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Connect • Share • Grow</div>
            </div>
          </Link>
          <nav className="hidden items-center gap-8 text-sm md:flex">
            <a href="#features" className="text-muted-foreground hover:text-foreground">Features</a>
            <a href="#impact" className="text-muted-foreground hover:text-foreground">Impact</a>
            <a href="#stats" className="text-muted-foreground hover:text-foreground">Stats</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/auth" search={{ mode: "signin" }} className="hidden md:inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-2">Sign in</Link>
            <Link to="/auth" search={{ mode: "signup" }}>
              <Button className="h-10 rounded-xl gradient-brand text-primary-foreground">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full gradient-brand opacity-20 blur-3xl" />
          <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
        </div>
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-2 md:gap-16 md:px-8 md:py-24 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              Built for Engineering Colleges • GTU Societal Internship
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl md:leading-[1.05]">
              Connect. Share. <span className="gradient-brand-text">Grow.</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:max-w-xl">
              A Smart Campus Ecosystem for Mentoring, Sharing Resources, Preserving Knowledge,
              Improving Employability, and Promoting Sustainability.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/auth" search={{ mode: "signup" }}>
                <Button size="lg" className="h-12 rounded-xl gradient-brand px-6 text-base text-primary-foreground shadow-soft">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="#features">
                <Button size="lg" variant="outline" className="h-12 rounded-xl border-border px-6 text-base">
                  Learn More
                </Button>
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-success" /> Secure SSO</div>
              <div className="flex items-center gap-2"><Leaf className="h-4 w-4 text-success" /> Sustainability tracked</div>
              <div className="flex items-center gap-2"><Trophy className="h-4 w-4 text-warning" /> Gamified contribution</div>
            </div>
          </motion.div>

          {/* Illustration card */}
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="relative">
            <div className="absolute -inset-4 rounded-3xl gradient-brand opacity-30 blur-2xl" />
            <div className="card-soft relative overflow-hidden p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold">Campus Pulse</div>
                <div className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">Live</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { i: Users, l: "Mentor sessions", v: "+42", c: "text-indigo-500" },
                  { i: BookOpen, l: "Notes shared", v: "+87", c: "text-emerald-500" },
                  { i: Cpu, l: "Components reused", v: "150", c: "text-blue-500" },
                  { i: Leaf, l: "CO₂ saved (kg)", v: "95", c: "text-emerald-600" },
                ].map((m, i) => (
                  <motion.div key={m.l} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                    className="rounded-2xl border border-border bg-background p-4">
                    <m.i className={`h-5 w-5 ${m.c}`} />
                    <div className="mt-2 text-xl font-bold">{m.v}</div>
                    <div className="text-[11px] text-muted-foreground">{m.l}</div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl gradient-brand p-4 text-primary-foreground">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider opacity-90"><BarChart3 className="h-3.5 w-3.5" /> Weekly impact</div>
                <div className="mt-2 flex items-end gap-1.5 h-16">
                  {[40, 60, 35, 70, 55, 85, 75].map((h, i) => (
                    <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.8, delay: 0.5 + i * 0.05 }}
                      className="flex-1 rounded-t-md bg-white/70" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">What's inside</div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Everything your campus needs, in one place</h2>
          <p className="mt-3 text-muted-foreground">Six connected pillars solving real engineering-college problems — from mentorship to sustainability.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="card-soft group p-6 transition-all hover:-translate-y-1 hover:shadow-glow">
              <div className={`mb-4 inline-grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${f.color} text-white shadow-soft`}>
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.body}</p>
              <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Explore <MoveRight className="ml-1 h-4 w-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="bg-card border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">A campus that's already buzzing</h2>
            <p className="mt-2 text-muted-foreground">Real activity from the first cohorts using CampusConnect.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Counter value={128} label="Active Users" />
            <Counter value={56} label="Resources Shared" />
            <Counter value={42} label="Mentorship Sessions" />
            <Counter value={87} label="Knowledge Documents" />
          </div>
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="card-soft overflow-hidden gradient-brand p-10 md:p-14 text-primary-foreground">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">Built for sustainability, employability, and legacy.</h2>
              <p className="mt-3 text-white/90">Track resource reuse, carbon savings, and contribution scores. Earn badges. Help juniors land their first internship.</p>
              <Link to="/auth" search={{ mode: "signup" }} className="mt-6 inline-flex">
                <Button size="lg" className="h-12 rounded-xl bg-white text-primary hover:bg-white/90 px-6">
                  Join your campus <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { v: "₹75K+", l: "Money saved" },
                { v: "320", l: "Resources reused" },
                { v: "95 kg", l: "CO₂ reduced" },
                { v: "120 kg", l: "Waste prevented" },
              ].map(s => (
                <div key={s.l} className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                  <div className="text-3xl font-bold">{s.v}</div>
                  <div className="text-sm text-white/80">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} CampusConnect — Connect • Share • Grow
      </footer>
    </div>
  );
}
