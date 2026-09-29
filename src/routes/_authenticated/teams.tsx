import { createFileRoute } from "@tanstack/react-router";
import { Users2, Sparkles, Code, Palette, Cpu, Microscope } from "lucide-react";
import { PageHeader } from "@/components/page-bits";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/teams")({ component: Matchmaker });

const matches = [
  { name: "Rohit Patel", role: "AI Engineer", match: 92, shared: ["AI", "Python"], complementary: ["MLOps", "Cloud"], color: "from-violet-500 to-fuchsia-500" },
  { name: "Aanya Roy", role: "Designer", match: 87, shared: ["UX research"], complementary: ["Figma", "Motion"], color: "from-pink-500 to-rose-500" },
  { name: "Karthik Iyer", role: "Hardware", match: 83, shared: ["Embedded"], complementary: ["VLSI", "PCB design"], color: "from-blue-500 to-indigo-500" },
  { name: "Meera Joshi", role: "Researcher", match: 78, shared: ["Data analysis"], complementary: ["Stats", "LaTeX"], color: "from-emerald-500 to-teal-500" },
];

const board = [
  { title: "Looking for: Backend dev for IoT capstone", by: "Karan V.", tags: ["Node.js", "MQTT"] },
  { title: "Hackathon team — Smart City theme", by: "Sneha M.", tags: ["Hackathon", "AI"] },
  { title: "Designer wanted: campus events app", by: "Aman V.", tags: ["Figma", "Mobile"] },
];

const roleIcons = { "AI Engineer": Sparkles, Designer: Palette, Hardware: Cpu, Researcher: Microscope } as const;

function Matchmaker() {
  return (
    <>
      <PageHeader title="Project Team Matchmaker" subtitle="Find teammates with complementary skills for your next build." />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-base font-semibold flex items-center gap-2"><Users2 className="h-4 w-4" />Top Matches for You</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {matches.map(m => {
              const Icon = roleIcons[m.role as keyof typeof roleIcons] ?? Sparkles;
              return (
                <div key={m.name} className="card-soft p-5">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12"><AvatarFallback className={`bg-gradient-to-br ${m.color} text-white text-sm font-semibold`}>
                      {m.name.split(" ").map(p => p[0]).join("")}
                    </AvatarFallback></Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold truncate">{m.name}</div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Icon className="h-3.5 w-3.5" />{m.role}</div>
                    </div>
                    <div className="rounded-xl gradient-brand px-2.5 py-1 text-xs font-bold text-primary-foreground">{m.match}%</div>
                  </div>
                  <div className="mt-3 text-xs">
                    <div className="text-muted-foreground">Shared</div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {m.shared.map(s => <span key={s} className="rounded-full bg-accent px-2 py-0.5 text-[11px]">{s}</span>)}
                    </div>
                  </div>
                  <div className="mt-2 text-xs">
                    <div className="text-muted-foreground">Complementary</div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {m.complementary.map(s => <span key={s} className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[11px] font-medium">{s}</span>)}
                    </div>
                  </div>
                  <Button onClick={() => toast.success(`Connection request sent to ${m.name}`)}
                    className="mt-4 h-10 w-full rounded-xl gradient-brand text-primary-foreground"><Code className="mr-2 h-4 w-4" />Connect</Button>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-base font-semibold">Collaboration Board</h2>
          <div className="card-soft p-3 space-y-2">
            {board.map((b, i) => (
              <div key={i} className="rounded-xl p-3 hover:bg-accent transition-colors">
                <div className="text-sm font-medium">{b.title}</div>
                <div className="text-xs text-muted-foreground">by {b.by}</div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {b.tags.map(t => <span key={t} className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-medium">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
