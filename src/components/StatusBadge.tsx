import type { AssetStatus, IssuePriority, IssueStatus } from "@/data/dummy";
import { cn } from "@/lib/utils";

type Kind = AssetStatus | IssuePriority | IssueStatus | string;

const MAP: Record<string, string> = {
  Operational: "bg-success/10 text-success ring-success/20",
  Inspection: "bg-info/10 text-info ring-info/20",
  Maintenance: "bg-warning/15 text-warning-foreground ring-warning/30",
  "Out of Service": "bg-destructive/10 text-destructive ring-destructive/20",
  Retired: "bg-muted text-muted-foreground ring-border",

  Low: "bg-muted text-muted-foreground ring-border",
  Medium: "bg-info/10 text-info ring-info/20",
  High: "bg-warning/15 text-warning-foreground ring-warning/30",
  Critical: "bg-destructive/10 text-destructive ring-destructive/20",

  Open: "bg-info/10 text-info ring-info/20",
  "In Progress": "bg-warning/15 text-warning-foreground ring-warning/30",
  Resolved: "bg-success/10 text-success ring-success/20",
  Closed: "bg-muted text-muted-foreground ring-border",
};

export function StatusBadge({ status, className }: { status: Kind; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1",
      MAP[status] ?? "bg-muted text-muted-foreground ring-border",
      className,
    )}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}
