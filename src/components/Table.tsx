import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => ReactNode;
  className?: string;
}

export function Table<T extends { id: string }>({
  columns, rows, empty,
}: { columns: Column<T>[]; rows: T[]; empty?: ReactNode }) {
  if (rows.length === 0 && empty) return <>{empty}</>;
  return (
    <div className="card-surface overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              {columns.map((c) => (
                <th key={String(c.key)} className={cn("px-4 py-3 text-left font-medium text-muted-foreground", c.className)}>
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.id} className={cn("border-t border-border transition-colors hover:bg-accent/50", i % 2 && "bg-muted/20")}>
                {columns.map((c) => (
                  <td key={String(c.key)} className={cn("px-4 py-3 align-middle", c.className)}>
                    {c.render ? c.render(row) : String((row as any)[c.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
