import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Plus, Building2, MapPin, Clock } from "lucide-react";
import { PageHeader } from "@/components/page-bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/referrals")({ component: ReferralsPage });

const postings = [
  { title: "SDE Intern", company: "Razorpay", location: "Bengaluru / Remote", type: "6-month internship", applicants: 12 },
  { title: "Data Analyst Intern", company: "Flipkart", location: "Bengaluru", type: "Summer internship", applicants: 8 },
  { title: "Frontend Engineer", company: "Zerodha", location: "Remote", type: "Full-time", applicants: 21 },
  { title: "Embedded Trainee", company: "Qualcomm", location: "Hyderabad", type: "Full-time", applicants: 5 },
];

function ReferralsPage() {
  return (
    <>
      <PageHeader
        title="Internship & Job Referrals"
        subtitle="Post opportunities from your company and refer high-potential students."
        action={<Button className="h-10 rounded-xl gradient-brand text-primary-foreground"><Plus className="h-4 w-4 mr-1.5" />New posting</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-soft p-6 lg:col-span-2 space-y-3">
          <h2 className="text-base font-semibold">Active Postings</h2>
          {postings.map(p => (
            <div key={p.title} className="rounded-xl border border-border p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-xs text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                    <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{p.company}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{p.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{p.type}</span>
                  </div>
                </div>
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium">{p.applicants} applicants</span>
              </div>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" className="rounded-lg">View applicants</Button>
                <Button size="sm" variant="outline" className="rounded-lg" onClick={() => toast.success("Referral added")}>Refer student</Button>
              </div>
            </div>
          ))}
        </div>

        <div className="card-soft p-6">
          <h2 className="text-base font-semibold flex items-center gap-2"><Briefcase className="h-4 w-4" />Post an opportunity</h2>
          <p className="text-xs text-muted-foreground mt-1">Share roles from your company.</p>
          <div className="mt-4 space-y-3">
            <Input placeholder="Role title" className="h-10 rounded-xl" />
            <Input placeholder="Company" className="h-10 rounded-xl" />
            <Input placeholder="Location" className="h-10 rounded-xl" />
            <Textarea placeholder="Short description & requirements" className="rounded-xl" rows={4} />
            <Button onClick={() => toast.success("Posting submitted for review")} className="h-10 w-full rounded-xl gradient-brand text-primary-foreground">
              Publish posting
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
