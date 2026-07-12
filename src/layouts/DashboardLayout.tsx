import { useState, type ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex min-w-0 flex-col">
        <Navbar onMenu={() => setOpen(true)} />
        <main className="flex-1 p-4 lg:p-6 animate-in fade-in duration-500">{children}</main>
      </div>
    </div>
  );
}
