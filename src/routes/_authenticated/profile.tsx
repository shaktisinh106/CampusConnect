import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Mail, Edit2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, displayName } from "@/lib/auth";
import { PageHeader, StatCard } from "@/components/page-bits";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Package, Users, BarChart3 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/profile")({ component: ProfilePage });

function ProfilePage() {
  const { user, profile, refresh } = useAuth();
  const name = displayName(profile, user);
  const initials = name.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase();

  const { data: timeline } = useQuery({
    queryKey: ["activity-self", user?.id],
    queryFn: async () => {
      if (!user) return [];
      return (await supabase.from("activities").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(10)).data ?? [];
    },
    enabled: !!user,
  });

  const fallbackTimeline = [
    { action: "Joined CampusConnect", target: "", created_at: user?.created_at ?? new Date().toISOString() },
    { action: "Set up your profile", target: "", created_at: new Date().toISOString() },
  ];
  const events = (timeline?.length ? timeline : fallbackTimeline);

  return (
    <>
      <PageHeader title="Profile" subtitle="Your campus identity and contribution timeline." action={<EditDialog onDone={refresh} />} />

      <div className="card-soft p-6 md:p-8">
        <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-5 items-start">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="gradient-brand text-2xl font-bold text-primary-foreground">{initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h2 className="text-2xl font-bold truncate">{name}</h2>
            <div className="mt-1 text-sm text-muted-foreground">
              {profile?.department || "Set your department"} {profile?.year ? `• ${profile.year}` : ""}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Mail className="h-3.5 w-3.5" /> {user?.email}
            </div>
            {profile?.bio && <p className="mt-3 text-sm text-foreground/80 max-w-2xl">{profile.bio}</p>}
            {profile?.skills?.length ? (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {profile.skills.map(s => (
                  <span key={s} className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">{s}</span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <StatCard icon={Package} label="Resources Shared" value={3} accent="from-violet-500 to-fuchsia-500" />
        <StatCard icon={Users} label="Mentorship Sessions" value={5} accent="from-indigo-500 to-violet-500" />
        <StatCard icon={BookOpen} label="Documents Uploaded" value={2} accent="from-emerald-500 to-teal-500" />
        <StatCard icon={BarChart3} label="Skill Score" value="72%" accent="from-blue-500 to-indigo-500" />
      </div>

      <div className="mt-8 card-soft p-6">
        <h2 className="mb-4 text-base font-semibold">Contribution Timeline</h2>
        <ol className="relative border-l border-border pl-5 space-y-5">
          {events.map((e: { action: string; target?: string | null; created_at: string }, i: number) => (
            <li key={i}>
              <div className="absolute -left-1.5 h-3 w-3 rounded-full gradient-brand" />
              <div className="text-sm font-medium">{e.action} {e.target && <span className="text-muted-foreground font-normal">— {e.target}</span>}</div>
              <div className="text-xs text-muted-foreground">{new Date(e.created_at).toLocaleString()}</div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

function EditDialog({ onDone }: { onDone: () => Promise<void> }) {
  const { user, profile } = useAuth();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    full_name: profile?.full_name ?? "",
    department: profile?.department ?? "",
    year: profile?.year ?? "",
    bio: profile?.bio ?? "",
    skills: (profile?.skills ?? []).join(", "),
  });

  const submit = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: form.full_name,
      department: form.department,
      year: form.year,
      bio: form.bio,
      skills: form.skills.split(",").map(s => s.trim()).filter(Boolean),
    });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Profile updated");
    await onDone();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-xl"><Edit2 className="mr-2 h-4 w-4" />Edit profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Edit profile</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div><Label>Full name</Label><Input className="h-11 rounded-xl mt-1.5" value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Department</Label><Input className="h-11 rounded-xl mt-1.5" value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} /></div>
            <div><Label>Year</Label><Input className="h-11 rounded-xl mt-1.5" value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} /></div>
          </div>
          <div><Label>Skills (comma-separated)</Label><Input className="h-11 rounded-xl mt-1.5" value={form.skills} onChange={e => setForm(f => ({ ...f, skills: e.target.value }))} placeholder="Python, Web Development, AI" /></div>
          <div><Label>Bio</Label><Textarea className="rounded-xl mt-1.5" value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} placeholder="Tell your campus a bit about you…" rows={3} /></div>
        </div>
        <DialogFooter>
          <Button onClick={submit} disabled={saving} className="rounded-xl gradient-brand text-primary-foreground">
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
