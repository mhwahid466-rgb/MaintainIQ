import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function StatCard({
  label, value, delta, icon, tone = "primary", className,
}: {
  label: string; value: string | number; delta?: string;
  icon: ReactNode;
  tone?: "primary" | "success" | "warning" | "danger" | "info";
  className?: string;
}) {
  const toneMap = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/15 text-warning-foreground",
    danger: "bg-destructive/10 text-destructive",
    info: "bg-info/10 text-info",
  }[tone];

  return (
    <div className={cn("card-surface p-5 transition-all hover:shadow-elevated hover:-translate-y-0.5", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
          {delta && <p className="mt-1 text-xs text-success">{delta}</p>}
        </div>
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", toneMap)}>
          {icon}
        </div>
      </div>
    </div>
  );
}
