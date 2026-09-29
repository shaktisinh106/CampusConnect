import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function PageHeader({ title, subtitle, action }: { title: ReactNode; subtitle?: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1.5 text-sm text-muted-foreground md:text-base">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function Section({ title, subtitle, children, action }: { title: string; subtitle?: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="mb-10">
      <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {children}
    </section>
  );
}

export function StatCard({
  icon: Icon, label, value, delta, trend, accent = "from-indigo-500 to-violet-500",
}: { icon: React.ComponentType<{ className?: string }>; label: string; value: string | number; delta?: string; trend?: number[]; accent?: string; }) {
  const [n, setN] = useState(0);
  const target = typeof value === "number" ? value : 0;
  useEffect(() => {
    if (typeof value !== "number") return;
    let raf = 0; const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / 900);
      setN(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, value]);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="card-soft p-5">
      <div className="flex items-start justify-between gap-3">
        <div className={cn("grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br text-white", accent)}>
          <Icon className="h-5 w-5" />
        </div>
        {delta && <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">{delta}</span>}
      </div>
      <div className="mt-4 text-3xl font-bold tracking-tight">{typeof value === "number" ? n.toLocaleString() : value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
      {trend && (
        <div className="mt-3 flex items-end gap-0.5 h-8">
          {trend.map((h, i) => (
            <div key={i} className={cn("flex-1 rounded-sm bg-gradient-to-t opacity-60", accent)} style={{ height: `${h}%` }} />
          ))}
        </div>
      )}
    </motion.div>
  );
}
