import type { ReactNode } from "react";
import { X } from "lucide-react";

export function Modal({
  open, onClose, title, children,
}: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="card-surface w-full max-w-lg animate-in zoom-in-95">
        <header className="flex items-center justify-between border-b border-border p-4">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-accent"><X className="h-4 w-4" /></button>
        </header>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
