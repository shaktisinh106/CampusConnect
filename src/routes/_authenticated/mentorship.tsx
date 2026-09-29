import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Star, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/page-bits";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/mentorship")({ component: MentorshipPage });

type Mentor = { id: string; name: string; department: string; year: string; skills: string[]; rating: number; bio: string };

const slots = ["10:00 AM", "11:30 AM", "1:00 PM", "3:00 PM", "4:30 PM", "6:00 PM"];

function MentorshipPage() {
  const [q, setQ] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["mentors"],
    queryFn: async () => (await supabase.from("mentors").select("*").order("rating", { ascending: false })).data as Mentor[] | null,
  });

  const filtered = (data ?? []).filter(m =>
    !q || m.name.toLowerCase().includes(q.toLowerCase()) ||
    m.skills?.some(s => s.toLowerCase().includes(q.toLowerCase())) ||
    m.department?.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <PageHeader title="Mentorship Hub" subtitle="Find a senior or alumnus mentor and book a session in minutes." />

      <div className="card-soft p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={e => setQ(e.target.value)}
            placeholder="Search by name, skill, or domain (e.g. Python, AI, VLSI)…"
            className="h-11 rounded-xl pl-10" />
        </div>
      </div>

      {isLoading ? (
        <div className="grid place-items-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m, i) => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="card-soft p-5">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="gradient-brand text-primary-foreground text-sm font-semibold">
                    {m.name.split(" ").map(p => p[0]).slice(0, 2).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold truncate">{m.name}</div>
                  <div className="text-xs text-muted-foreground">{m.department} • {m.year}</div>
                  <div className="mt-1 flex items-center gap-1 text-xs">
                    <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                    <span className="font-medium">{m.rating}</span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{m.bio}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {m.skills?.slice(0, 4).map(s => (
                  <span key={s} className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-medium text-accent-foreground">{s}</span>
                ))}
              </div>
              <BookingDialog mentor={m} />
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}

function BookingDialog({ mentor }: { mentor: Mentor }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [slot, setSlot] = useState(slots[0]);

  const confirm = () => {
    toast.success(`Session booked with ${mentor.name} on ${date} at ${slot}`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-4 w-full h-10 rounded-xl gradient-brand text-primary-foreground">Connect</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book a session with {mentor.name}</DialogTitle>
          <DialogDescription>Pick a date and time slot. You'll get a confirmation by email.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <div className="mb-1.5 text-sm font-medium">Date</div>
            <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="h-11 rounded-xl" />
          </div>
          <div>
            <div className="mb-1.5 text-sm font-medium">Time slot</div>
            <div className="grid grid-cols-3 gap-2">
              {slots.map(s => (
                <button key={s} onClick={() => setSlot(s)}
                  className={`rounded-xl border px-3 py-2 text-sm transition-colors ${slot === s ? "gradient-brand text-primary-foreground border-transparent" : "border-border hover:bg-accent"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={confirm} className="gradient-brand text-primary-foreground rounded-xl">
            <CalendarIcon className="mr-2 h-4 w-4" /> Confirm booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
