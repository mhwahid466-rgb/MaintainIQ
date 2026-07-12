import { createFileRoute } from "@tanstack/react-router";
import { notifications } from "@/data/dummy";
import { PageHeader } from "@/components/PageHeader";
import { Bell, Wrench, AlertTriangle, Sparkles, FileText, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS: Record<string, any> = { issue: AlertTriangle, maintenance: Wrench, ai: Sparkles, report: FileText, info: Info };

export const Route = createFileRoute("/_app/notifications")({
  head: () => ({ meta: [{ title: "Notifications — MaintainIQ" }] }),
  component: NotificationsPage,
});

function NotificationsPage() {
  return (
    <div>
      <PageHeader title="Notifications" description="Real-time updates from across your workspace." />
      <div className="space-y-3 max-w-3xl">
        {notifications.map(n => {
          const Icon = ICONS[n.type] || Bell;
          return (
            <div key={n.id} className={cn("card-surface flex items-start gap-4 p-4", !n.read && "ring-2 ring-primary/20")}>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{n.title}</p>
                  {!n.read && <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold uppercase text-primary-foreground">New</span>}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{n.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
