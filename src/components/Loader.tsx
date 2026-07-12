export function Loader({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary" />
      {label && <p className="text-sm">{label}</p>}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-muted ${className ?? ""}`} />;
}
