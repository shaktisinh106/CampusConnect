import { createFileRoute } from "@tanstack/react-router";
import { Mic, Calendar, Users, Plus } from "lucide-react";
import { PageHeader } from "@/components/page-bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/career-talks")({ component: CareerTalksPage });

const talks = [
  { title: "Breaking into Product Management", date: "Sat, Jul 5 • 6 PM", rsvp: 84, status: "Upcoming" },
  { title: "Life as an SDE at Google", date: "Fri, Jul 11 • 7 PM", rsvp: 132, status: "Upcoming" },
  { title: "Fintech career roadmap", date: "Past — Jun 12", rsvp: 96, status: "Recording available" },
];

function CareerTalksPage() {
  return (
    <>
      <PageHeader
        title="Career Talks & Webinars"
        subtitle="Host industry sessions and inspire the next generation of engineers."
        action={<Button className="h-10 rounded-xl gradient-brand text-primary-foreground"><Plus className="h-4 w-4 mr-1.5" />Schedule talk</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-soft p-6 lg:col-span-2 space-y-3">
          <h2 className="text-base font-semibold">Your Talks</h2>
          {talks.map(t => (
            <div key={t.title} className="rounded-xl border border-border p-4 flex items-start justify-between gap-3">
              <div className="flex gap-3 min-w-0">
                <div className="grid h-10 w-10 place-items-center rounded-xl gradient-brand text-primary-foreground shrink-0">
                  <Mic className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold truncate">{t.title}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{t.date}</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />{t.rsvp} RSVPs</span>
                  </div>
                </div>
              </div>
              <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium shrink-0">{t.status}</span>
            </div>
          ))}
        </div>

        <div className="card-soft p-6">
          <h2 className="text-base font-semibold">Schedule a new talk</h2>
          <div className="mt-4 space-y-3">
            <Input placeholder="Talk title" className="h-10 rounded-xl" />
            <Input type="datetime-local" className="h-10 rounded-xl" />
            <Textarea placeholder="What will you cover?" className="rounded-xl" rows={4} />
            <Button onClick={() => toast.success("Talk scheduled — invites sent")} className="h-10 w-full rounded-xl gradient-brand text-primary-foreground">
              Publish & invite students
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
