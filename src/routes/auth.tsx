import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/lib/auth";
import { roleHome } from "@/lib/permissions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Role = "student" | "alumnus" | "admin";
type Mode = "signin" | "signup" | "forgot";

const quotes = [
  "Reuse what you have. Reimagine what's next.",
  "Every shared note is a future engineer's first step.",
  "Mentorship turns knowledge into legacy.",
  "Sustainable campuses build sustainable careers.",
  "Collaboration is the new currency of innovation.",
];

export const Route = createFileRoute("/auth")({
  validateSearch: z.object({ mode: z.enum(["signin", "signup", "forgot"]).optional(), redirect: z.string().optional() }),
  component: AuthPage,
});

function AuthPage() {
  const search = useSearch({ from: "/auth" });
  const navigate = useNavigate();
  const { user, loading, role: currentRole } = useAuth();
  const [mode, setMode] = useState<Mode>(search.mode ?? "signin");
  const [role, setRole] = useState<Role>("student");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    if (loading || !user) return;
    const home = currentRole ? roleHome[currentRole] : "/dashboard";
    navigate({ to: search.redirect ?? home, replace: true });
  }, [user, loading, currentRole, navigate, search.redirect]);

  useEffect(() => {
    const t = setInterval(() => setQuoteIdx(i => (i + 1) % quotes.length), 4500);
    return () => clearInterval(t);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const home = roleHome[role];
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            emailRedirectTo: `${window.location.origin}${home}`,
            data: { full_name: form.name, role },
          },
        });
        if (error) throw error;
        toast.success(`Welcome aboard, ${form.name || "friend"}!`);
        // navigation will happen via the useEffect once role hydrates
      } else if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password });
        if (error) throw error;
        toast.success("Welcome back!");
        // useEffect handles role-aware redirect once profile + role load
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(form.email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success("Check your email for the reset link.");
        setMode("signin");
      }
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  const onGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/auth" });
    if (result.error) toast.error(result.error.message);
    // role-aware redirect handled by useEffect after session hydrates
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left — illustration / quotes */}
      <div className="relative hidden overflow-hidden gradient-brand lg:flex">
        <div className="absolute inset-0">
          <motion.div
            className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-white/10 blur-3xl"
            animate={{ x: [0, 60, 0], y: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-0 h-[34rem] w-[34rem] rounded-full bg-white/10 blur-3xl"
            animate={{ x: [0, -50, 0], y: [0, -30, 0] }} transition={{ duration: 18, repeat: Infinity }}
          />
          <svg className="absolute inset-0 h-full w-full opacity-[0.08]" viewBox="0 0 800 800">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0H0V40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="800" height="800" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative z-10 flex w-full flex-col justify-between p-12 text-primary-foreground">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 backdrop-blur">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <div className="text-lg font-bold">CampusConnect</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/80">Connect • Share • Grow</div>
            </div>
          </Link>
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={quoteIdx}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-[11px] uppercase tracking-[0.2em] text-white/70 mb-3">Today's spark</div>
                <p className="text-3xl font-semibold leading-snug max-w-md">"{quotes[quoteIdx]}"</p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[{ n: "128", l: "Active users" }, { n: "56", l: "Resources shared" }, { n: "42", l: "Mentor sessions" }].map(s => (
                <div key={s.l} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <div className="text-2xl font-bold">{s.n}</div>
                  <div className="text-xs text-white/80">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-xs text-white/70">A Smart Circular Learning & Innovation Ecosystem for Engineering Colleges.</div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex flex-col">
        <div className="flex justify-end px-6 py-4 lg:hidden">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Home</Link>
        </div>
        <div className="flex flex-1 items-center justify-center px-6 py-8">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center lg:text-left">
              <h1 className="text-3xl font-bold tracking-tight">
                {mode === "signin" ? "Welcome back" : mode === "signup" ? "Create your account" : "Reset your password"}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {mode === "signin" ? "Sign in to continue building a smarter campus." :
                 mode === "signup" ? "Join the campus innovation ecosystem." :
                 "We'll email you a secure reset link."}
              </p>
            </div>

            {mode !== "forgot" && (
              <Tabs value={role} onValueChange={(v) => setRole(v as Role)} className="mb-6">
                <TabsList className="grid w-full grid-cols-3 rounded-xl">
                  <TabsTrigger value="student" className="rounded-lg">Student</TabsTrigger>
                  <TabsTrigger value="alumnus" className="rounded-lg">Alumnus</TabsTrigger>
                  <TabsTrigger value="admin" className="rounded-lg">Admin</TabsTrigger>
                </TabsList>
              </Tabs>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              {mode === "signup" && (
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="name" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Riya Sharma" className="h-11 rounded-xl pl-10" />
                  </div>
                </div>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="email">Institutional email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="email" type="email" required value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="you@college.edu" className="h-11 rounded-xl pl-10" />
                </div>
              </div>

              {mode !== "forgot" && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    {mode === "signin" && (
                      <button type="button" onClick={() => setMode("forgot")} className="text-xs font-medium text-primary hover:underline">
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="password" type={showPass ? "text" : "password"} required minLength={6}
                      value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                      placeholder="••••••••" className="h-11 rounded-xl pl-10 pr-10" />
                    <button type="button" onClick={() => setShowPass(s => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label="Toggle password visibility">
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}

              {mode === "signin" && (
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" checked={remember} onCheckedChange={(v) => setRemember(Boolean(v))} />
                  <Label htmlFor="remember" className="cursor-pointer text-sm font-normal text-muted-foreground">Remember me on this device</Label>
                </div>
              )}

              <Button type="submit" disabled={submitting}
                className={cn("h-11 w-full rounded-xl gradient-brand text-base font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.01]")}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {mode === "signin" ? "Sign In" : mode === "signup" ? "Create account" : "Send reset link"}
              </Button>
            </form>

            {mode !== "forgot" && (
              <>
                <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="h-px flex-1 bg-border" /> OR <div className="h-px flex-1 bg-border" />
                </div>
                <Button type="button" variant="outline" onClick={onGoogle}
                  className="h-11 w-full rounded-xl border-border text-sm font-medium">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/>
                    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.1C29.1 35.3 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.4 39.6 16.1 44 24 44z"/>
                    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.3 4.4-4.2 5.7l6.2 5.1C40.9 35.6 44 30.3 44 24c0-1.2-.1-2.3-.4-3.5z"/>
                  </svg>
                  Continue with Google
                </Button>
              </>
            )}

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {mode === "signin" ? (
                <>New here? <button onClick={() => setMode("signup")} className="font-medium text-primary hover:underline">Create an account</button></>
              ) : mode === "signup" ? (
                <>Already have an account? <button onClick={() => setMode("signin")} className="font-medium text-primary hover:underline">Sign in</button></>
              ) : (
                <button onClick={() => setMode("signin")} className="font-medium text-primary hover:underline">← Back to sign in</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
