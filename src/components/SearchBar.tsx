import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

export function SearchBar({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cn("relative flex-1 max-w-md", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        {...rest}
        className="h-10 w-full rounded-xl border border-border bg-card pl-10 pr-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        placeholder={rest.placeholder ?? "Search assets, issues, technicians…"}
      />
    </div>
  );
}
