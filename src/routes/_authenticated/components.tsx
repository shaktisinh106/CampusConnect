import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Cpu, IndianRupee, Recycle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader, StatCard } from "@/components/page-bits";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/components")({ component: ComponentsPage });

function ComponentsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["components"],
    queryFn: async () => (await supabase.from("components").select("*").order("name")).data ?? [],
  });

  const total = (data ?? []).reduce((s, c) => s + (c.total_quantity ?? 0), 0);
  const reused = (data ?? []).reduce((s, c) => s + ((c.total_quantity ?? 0) - (c.available_quantity ?? 0)), 0);

  return (
    <>
      <PageHeader title="Component Bank" subtitle="Borrow lab components instead of buying new ones. Build sustainably." />

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <StatCard icon={Cpu} label="Total Components" value={total} accent="from-blue-500 to-indigo-500" />
        <StatCard icon={Recycle} label="Components Reused" value={reused} delta="+24 this month" accent="from-emerald-500 to-teal-500" />
        <StatCard icon={IndianRupee} label="Money Saved" value="₹48,750" delta="+₹6,200" accent="from-violet-500 to-fuchsia-500" />
      </div>

      <div className="card-soft p-4 md:p-6 overflow-x-auto">
        {isLoading ? <div className="grid place-items-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div> : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Component</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Available</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(data ?? []).map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell><span className="rounded-full bg-accent px-2.5 py-0.5 text-xs">{c.category}</span></TableCell>
                  <TableCell className="text-right">{c.total_quantity}</TableCell>
                  <TableCell className="text-right">
                    <span className={(c.available_quantity ?? 0) > 0 ? "text-success font-medium" : "text-warning"}>
                      {c.available_quantity}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" className="rounded-lg" onClick={() => toast.success(`Reserved ${c.name}`)}>Reserve</Button>
                      <Button size="sm" className="rounded-lg gradient-brand text-primary-foreground" onClick={() => toast.success(`Borrow request sent for ${c.name}`)}>
                        Borrow
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
}
