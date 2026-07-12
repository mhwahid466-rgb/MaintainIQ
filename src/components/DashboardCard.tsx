import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function DashboardCard({
  title, subtitle, action, children, className,
}: {
  title: string; subtitle?: string; action?: ReactNode; children: ReactNode; className?: string;
}) {
  return (
    <section className={cn("card-surface p-5", className)}>
      <header className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-base font-semibold tracking-tight">{title}</h3>
          {subtitle && <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}
