import { useState } from "react";
import { currentUser } from "@/data/dummy";
import { Link } from "@tanstack/react-router";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";

export function ProfileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}
              className="flex items-center gap-2 rounded-xl p-1 pr-2 hover:bg-accent">
        <img src={currentUser.avatar} alt={currentUser.name} className="h-8 w-8 rounded-full object-cover" />
        <div className="hidden text-left md:block">
          <p className="text-xs font-medium leading-none">{currentUser.name}</p>
          <p className="text-[10px] text-muted-foreground">{currentUser.role}</p>
        </div>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-40 mt-2 w-56 card-surface p-1 animate-in fade-in slide-in-from-top-2">
          <Link to="/profile" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-accent">
            <User className="h-4 w-4" /> Profile
          </Link>
          <Link to="/settings" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-accent">
            <Settings className="h-4 w-4" /> Settings
          </Link>
          <div className="my-1 border-t border-border" />
          <Link to="/login" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4" /> Log out
          </Link>
        </div>
      )}
    </div>
  );
}
