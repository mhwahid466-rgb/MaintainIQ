import { Link } from "@tanstack/react-router";
import { Bell, Menu } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { ProfileMenu } from "./ProfileMenu";
import { notifications } from "@/data/dummy";

export function Navbar({ onMenu }: { onMenu?: () => void }) {
  const unread = notifications.filter(n => !n.read).length;
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur">
      <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
        <button onClick={onMenu} className="lg:hidden rounded-xl p-2 hover:bg-accent" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </button>
        <SearchBar />
        <div className="ml-auto flex items-center gap-1">
          <Link to="/notifications" className="relative rounded-xl p-2 hover:bg-accent" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            {unread > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
                {unread}
              </span>
            )}
          </Link>
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
