import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getAsset, getAssetHistory } from "@/data/dummy";
import { StatusBadge } from "@/components/StatusBadge";
import { AlertTriangle, ScanLine, MapPin, Calendar } from "lucide-react";
import { Timeline } from "@/components/Timeline";

export const Route = createFileRoute("/public/$id")({
  head: () => ({ meta: [{ title: "Asset — MaintainIQ" }] }),
  component: PublicAssetPage,
  notFoundComponent: () => <div className="p-8">Asset not found.</div>,
});

function PublicAssetPage() {
  const { id } = Route.useParams();
  const asset = getAsset(id);
  if (!asset) throw notFound();
  const events = getAssetHistory(id).slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <ScanLine className="h-4 w-4" />
            </div>
            <span className="font-semibold">MaintainIQ</span>
          </Link>
          <span className="text-xs text-muted-foreground">Public asset page</span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6 space-y-6">
        <div className="card-surface overflow-hidden">
          <div className="relative aspect-[16/7]">
            <img src={asset.image} alt={asset.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5 text-white">
              <StatusBadge status={asset.status} className="mb-2 bg-white/90 !ring-white/30" />
              <h1 className="text-2xl font-semibold tracking-tight">{asset.name}</h1>
              <p className="text-sm opacity-90">{asset.code} · {asset.category}</p>
            </div>
          </div>
          <div className="p-5 grid gap-3 sm:grid-cols-2">
            <p className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-muted-foreground" /> {asset.location}</p>
            <p className="flex items-center gap-2 text-sm"><Calendar className="h-4 w-4 text-muted-foreground" /> Next service {asset.nextService}</p>
          </div>
        </div>

        <Link to="/issues/new"
              className="flex items-center justify-center gap-2 rounded-2xl bg-destructive px-6 py-5 text-lg font-semibold text-destructive-foreground shadow-soft transition-all hover:bg-destructive/90 active:scale-[0.99]">
          <AlertTriangle className="h-5 w-5" /> Report an Issue
        </Link>

        <div className="card-surface p-5">
          <h3 className="mb-4 font-semibold">Recent activity</h3>
          {events.length ? <Timeline events={events} /> : <p className="text-sm text-muted-foreground">No activity yet.</p>}
        </div>
      </main>
    </div>
  );
}
