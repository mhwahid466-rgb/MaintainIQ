import type { HistoryEvent } from "@/data/dummy";
import { Wrench, AlertCircle, CheckCircle2, ClipboardCheck, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = {
  created: PlusCircle,
  maintenance: Wrench,
  issue: AlertCircle,
  resolved: CheckCircle2,
  inspection: ClipboardCheck,
};
const TONES = {
  created: "bg-info/10 text-info",
  maintenance: "bg-warning/15 text-warning-foreground",
  issue: "bg-destructive/10 text-destructive",
  resolved: "bg-success/10 text-success",
  inspection: "bg-primary/10 text-primary",
};

export function Timeline({ events }: { events: HistoryEvent[] }) {
  return (
    <ol className="relative space-y-6 pl-6">
      <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />
      {events.map((e) => {
        const Icon = ICONS[e.type];
        return (
          <li key={e.id} className="relative">
            <div className={cn("absolute -left-6 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-background", TONES[e.type])}>
              <Icon className="h-3.5 w-3.5" />
            </div>
            <div className="card-surface p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium">{e.action}</p>
                <span className="text-xs text-muted-foreground">{e.date}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">by {e.user} · {e.status}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
