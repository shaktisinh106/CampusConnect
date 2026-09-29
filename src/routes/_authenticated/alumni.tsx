import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Briefcase, MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/page-bits";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/alumni")({ component: AlumniPage });

const alumni = [
  { name: "Aditya Rao", role: "Software Engineer", company: "Google", year: "2022", skills: ["Distributed Systems", "Go"] },
  { name: "Tanvi Shah", role: "Data Scientist", company: "Microsoft", year: "2021", skills: ["ML", "Azure"] },
  { name: "Vikram Mehta", role: "Product Manager", company: "Razorpay", year: "2020", skills: ["Fintech", "Strategy"] },
  { name: "Pooja Iyer", role: "Embedded Engineer", company: "Qualcomm", year: "2023", skills: ["RTOS", "ARM"] },
  { name: "Rahul Bansal", role: "ML Engineer", company: "Flipkart", year: "2022", skills: ["NLP", "Recsys"] },
  { name: "Sneha M.", role: "Founder", company: "Greenly (YC)", year: "2019", skills: ["Sustainability", "B2B SaaS"] },
];

function AlumniPage() {
  return (
    <>
      <PageHeader title="Alumni Bridge" subtitle="Connect with alumni for mentorship, referrals, and industry guidance." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {alumni.map(a => (
          <div key={a.name} className="card-soft p-5">
            <div className="flex items-start gap-3">
              <Avatar className="h-12 w-12"><AvatarFallback className="gradient-brand text-primary-foreground text-sm font-semibold">
                {a.name.split(" ").map(p => p[0]).join("")}
              </AvatarFallback></Avatar>
              <div className="min-w-0 flex-1">
                <div className="font-semibold truncate">{a.name}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1"><Briefcase className="h-3 w-3" />{a.role} • {a.company}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1"><GraduationCap className="h-3 w-3" />Class of {a.year}</div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {a.skills.map(s => <span key={s} className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-medium">{s}</span>)}
            </div>
            <Button onClick={() => toast.success(`Connection request sent to ${a.name}`)}
              className="mt-4 h-10 w-full rounded-xl gradient-brand text-primary-foreground">Connect</Button>
          </div>
        ))}
      </div>

      <div className="card-soft p-6">
        <h2 className="text-base font-semibold flex items-center gap-2"><MessageSquare className="h-4 w-4" />Ask Alumni</h2>
        <p className="text-sm text-muted-foreground mt-1">Post a question — alumni in the network will respond.</p>
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <Input placeholder="e.g. How did you crack your first PM role at a fintech?" className="h-11 rounded-xl" />
          <Button onClick={() => toast.success("Your question was posted")}
            className="h-11 rounded-xl gradient-brand text-primary-foreground sm:w-auto">Ask</Button>
        </div>
      </div>
    </>
  );
}
