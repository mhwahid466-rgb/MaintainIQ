import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Boxes, PlusCircle, AlertTriangle, Wrench,
  History as HistoryIcon, BarChart3, Bell, User, Settings, LogOut, ScanLine, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/assets", label: "Assets", icon: Boxes },
  { to: "/assets/new", label: "Add Asset", icon: PlusCircle },
  { to: "/issues", label: "Issues", icon: AlertTriangle },
  { to: "/maintenance", label: "Maintenance", icon: Wrench },
  { to: "/history", label: "History", icon: HistoryIcon },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string, exact?: boolean) => exact ? pathname === to : pathname === to || pathname.startsWith(to + "/") || pathname === to;

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-foreground/30 lg:hidden" onClick={onClose} />}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 border-r border-sidebar-border bg-sidebar transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
      )}>
        <div className="flex h-16 items-center justify-between px-5 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft">
              <ScanLine className="h-4 w-4" />
            </div>
            <span className="font-semibold tracking-tight">MaintainIQ</span>
          </Link>
          <button className="lg:hidden rounded-lg p-1 hover:bg-accent" onClick={onClose}><X className="h-4 w-4" /></button>
        </div>
        <nav className="flex flex-col gap-0.5 p-3">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to, (item as any).exact);
            return (
              <Link
                key={item.to} to={item.to} onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                  active ? "bg-primary text-primary-foreground shadow-soft" : "text-sidebar-foreground hover:bg-accent",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <div className="my-2 border-t border-sidebar-border" />
          <Link to="/login"
                className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4" /> Logout
          </Link>
        </nav>
        <div className="mt-auto p-4">
          <div className="rounded-2xl bg-primary/10 p-4 text-sm">
            <p className="font-semibold text-primary">AI Assistant</p>
            <p className="mt-1 text-xs text-muted-foreground">Ask MaintainIQ AI to diagnose recurring issues in seconds.</p>
          </div>
        </div>
      </aside>
    </>
  );
}
