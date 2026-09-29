import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download, BarChart3, Leaf, GraduationCap, Package, Users, Briefcase } from "lucide-react";
import { PageHeader } from "@/components/page-bits";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/reports")({ component: ReportsPage });

const reports = [
  { title: "Monthly Activity Report", icon: BarChart3, desc: "All campus activity across modules" },
  { title: "Department Report", icon: Users, desc: "Engagement and performance by department" },
  { title: "Sustainability Report", icon: Leaf, desc: "Carbon savings, reuse, and impact metrics" },
  { title: "Placement Readiness Report", icon: GraduationCap, desc: "Skill gap, mock interviews, offers" },
  { title: "Resource Sharing Report", icon: Package, desc: "Notes, books and material shared" },
  { title: "Alumni Contribution Report", icon: Briefcase, desc: "Mentorship, referrals and donations" },
];

function ReportsPage() {
  return (
    <>
      <PageHeader title="Reports" subtitle="Generate, preview and export administrative reports." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map(r => (
          <div key={r.title} className="card-soft p-5">
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl gradient-brand text-primary-foreground shadow-soft">
                <r.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold">{r.title}</div>
                <div className="text-xs text-muted-foreground">{r.desc}</div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" className="rounded-lg flex-1"><FileText className="h-4 w-4 mr-1.5" />Preview</Button>
              <Button size="sm" onClick={() => toast.success(`${r.title} exported`)} className="rounded-lg gradient-brand text-primary-foreground flex-1">
                <Download className="h-4 w-4 mr-1.5" />Export
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
