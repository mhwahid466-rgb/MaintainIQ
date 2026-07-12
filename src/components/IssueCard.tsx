import { Link } from "@tanstack/react-router";
import type { Issue } from "@/data/dummy";
import { StatusBadge } from "./StatusBadge";
import { AlertCircle } from "lucide-react";

export function IssueCard({ issue }: { issue: Issue }) {
  return (
    <Link to="/issues/$id" params={{ id: issue.id }}
          className="card-surface flex items-start gap-4 p-4 transition-all hover:shadow-elevated hover:-translate-y-0.5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
        <AlertCircle className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">{issue.number}</span>
          <StatusBadge status={issue.priority} />
          <StatusBadge status={issue.status} />
        </div>
        <h4 className="mt-1 truncate font-medium">{issue.title}</h4>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {issue.assetName} · {issue.createdAt} · {issue.technician}
        </p>
      </div>
    </Link>
  );
}
