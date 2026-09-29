import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Calendar, MapPin, Bell } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/page-bits";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/events")({ component: EventsPage });

function EventsPage() {
  const { data } = useQuery({
    queryKey: ["events"],
    queryFn: async () => (await supabase.from("events").select("*").order("event_date")).data ?? [],
  });

  const updates = [
    { t: "New mentor onboarded", d: "Sneha Iyer (PM, Stripe)", time: "2h ago" },
    { t: "Component bank restocked", d: "Added 5× ESP32, 10× IR sensors", time: "5h ago" },
    { t: "Knowledge milestone", d: "100+ documents this month 🎉", time: "1d ago" },
    { t: "Placement training scheduled", d: "Mock interviews — Friday 4pm", time: "2d ago" },
  ];

  return (
    <>
      <PageHeader title="Events & Updates" subtitle="Stay on top of workshops, hackathons and campus announcements." />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-base font-semibold">Upcoming Events</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {(data ?? []).map(e => (
              <div key={e.id} className="card-soft overflow-hidden">
                <div className="h-28 gradient-brand grid place-items-center text-primary-foreground">
                  <Calendar className="h-10 w-10 opacity-80" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold">{e.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{e.description}</p>
                  <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{new Date(e.event_date).toLocaleDateString(undefined, { dateStyle: "medium" })}</div>
                    <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{e.location}</div>
                  </div>
                  <Button className="mt-4 h-10 w-full rounded-xl gradient-brand text-primary-foreground" onClick={() => toast.success(`Registered for ${e.title}`)}>
                    Register
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-base font-semibold flex items-center gap-2"><Bell className="h-4 w-4" />Notification Feed</h2>
          <div className="card-soft p-2">
            <ul className="space-y-1">
              {updates.map((u, i) => (
                <li key={i} className="rounded-xl p-3 hover:bg-accent transition-colors">
                  <div className="text-sm font-medium">{u.t}</div>
                  <div className="text-xs text-muted-foreground">{u.d}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{u.time}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
