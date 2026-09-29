import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Package, Search, Loader2, IndianRupee } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/page-bits";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/resources")({ component: ResourcesPage });

const categories = ["All", "Books", "Calculators", "Lab Coats", "Drawing Kits", "Sports Equipment", "Others"];

function ResourcesPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["resources"],
    queryFn: async () => (await supabase.from("resources").select("*").order("created_at", { ascending: false })).data ?? [],
  });

  const items = (data ?? []).filter(r =>
    (cat === "All" || r.category === cat) &&
    (!q || r.title.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <>
      <PageHeader title="Resource Marketplace" subtitle="Borrow what you need. Share what you don't. Save money and waste." />

      <div className="card-soft p-4 mb-6 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search resources…" className="h-11 rounded-xl pl-10" />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${cat === c ? "gradient-brand text-primary-foreground" : "border border-border bg-card hover:bg-accent"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? <div className="grid place-items-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(r => (
            <div key={r.id} className="card-soft overflow-hidden">
              <div className="h-32 gradient-brand opacity-90 grid place-items-center text-primary-foreground">
                <Package className="h-10 w-10 opacity-80" />
              </div>
              <div className="p-5">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{r.category}</div>
                <h3 className="mt-1 font-semibold line-clamp-1">{r.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{r.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-0.5 text-success font-semibold text-sm">
                    <IndianRupee className="h-3.5 w-3.5" />{r.price_saved} saved
                  </span>
                  <span className={`text-xs font-medium ${r.available ? "text-success" : "text-warning"}`}>
                    {r.available ? "Available" : "Borrowed"}
                  </span>
                </div>
                <Button disabled={!r.available} onClick={() => toast.success(`Request sent for ${r.title}`)}
                  className="mt-4 h-10 w-full rounded-xl gradient-brand text-primary-foreground">
                  {r.available ? "Request" : "Notify me"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
