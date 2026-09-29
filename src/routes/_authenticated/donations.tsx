import { createFileRoute } from "@tanstack/react-router";
import { Package, Cpu, BookOpen, Wrench, Plus } from "lucide-react";
import { PageHeader, StatCard } from "@/components/page-bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/donations")({ component: DonationsPage });

const history = [
  { item: "Cracking the Coding Interview (5 copies)", category: "Books", date: "Jun 12" },
  { item: "Arduino Uno R3 (10 units)", category: "Components", date: "May 28" },
  { item: "Logitech webcams (3 units)", category: "Electronics", date: "May 14" },
  { item: "Soldering station", category: "Lab Equipment", date: "Apr 22" },
];

function DonationsPage() {
  return (
    <>
      <PageHeader
        title="Resource Donations"
        subtitle="Give back — donate books, components, electronics and lab equipment to the campus."
        action={<Button className="h-10 rounded-xl gradient-brand text-primary-foreground"><Plus className="h-4 w-4 mr-1.5" />New donation</Button>}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard icon={BookOpen} label="Books Donated" value={28} accent="from-indigo-500 to-violet-500" />
        <StatCard icon={Cpu} label="Components Donated" value={64} accent="from-violet-500 to-fuchsia-500" />
        <StatCard icon={Package} label="Electronics" value={9} accent="from-blue-500 to-indigo-500" />
        <StatCard icon={Wrench} label="Lab Equipment" value={4} accent="from-emerald-500 to-teal-500" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-soft p-6 lg:col-span-2">
          <h2 className="text-base font-semibold mb-3">Donation History</h2>
          <div className="space-y-2">
            {history.map(h => (
              <div key={h.item} className="flex items-center justify-between rounded-xl border border-border p-3">
                <div>
                  <div className="text-sm font-medium">{h.item}</div>
                  <div className="text-xs text-muted-foreground">{h.category}</div>
                </div>
                <div className="text-xs text-muted-foreground">{h.date}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-soft p-6">
          <h2 className="text-base font-semibold">Donate an item</h2>
          <div className="mt-4 space-y-3">
            <Input placeholder="Item name" className="h-10 rounded-xl" />
            <Select>
              <SelectTrigger className="h-10 rounded-xl"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="books">Books</SelectItem>
                <SelectItem value="components">Components</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="lab">Lab Equipment</SelectItem>
                <SelectItem value="learning">Learning Resources</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Quantity" type="number" className="h-10 rounded-xl" />
            <Textarea placeholder="Condition & notes" className="rounded-xl" rows={3} />
            <Button onClick={() => toast.success("Donation logged. Thank you!")} className="h-10 w-full rounded-xl gradient-brand text-primary-foreground">
              Submit donation
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
