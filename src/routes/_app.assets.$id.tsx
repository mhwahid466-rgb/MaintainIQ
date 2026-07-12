import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getAsset, getAssetHistory } from "@/data/dummy";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { QRCard } from "@/components/QRCard";
import { Timeline } from "@/components/Timeline";
import { Button } from "@/components/Button";
import { ExternalLink, MapPin, User, Wrench, Calendar } from "lucide-react";

export const Route = createFileRoute("/_app/assets/$id")({
  head: () => ({ meta: [{ title: "Asset details — MaintainIQ" }] }),
  component: AssetDetailsPage,
  notFoundComponent: () => <div className="p-8">Asset not found.</div>,
});

function AssetDetailsPage() {
  const { id } = Route.useParams();
  const asset = getAsset(id);
  if (!asset) throw notFound();
  const events = getAssetHistory(id);

  return (
    <div>
      <PageHeader
        title={asset.name}
        description={`${asset.code} · ${asset.category}`}
        actions={
          <>
            <Link to="/public/$id" params={{ id: asset.id }}
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-medium hover:bg-accent">
              <ExternalLink className="h-4 w-4" /> Open Public Page
            </Link>
            <Button>Edit</Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <div className="card-surface overflow-hidden">
            <img src={asset.image} alt={asset.name} className="aspect-[16/8] w-full object-cover" />
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3"><StatusBadge status={asset.status} /></div>
              <p className="text-sm text-muted-foreground">{asset.description}</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Info icon={<MapPin className="h-4 w-4" />} label="Location" value={asset.location} />
                <Info icon={<Wrench className="h-4 w-4" />} label="Condition" value={asset.condition} />
                <Info icon={<User className="h-4 w-4" />} label="Technician" value={asset.technician} />
                <Info icon={<Calendar className="h-4 w-4" />} label="Last / Next service" value={`${asset.lastService} → ${asset.nextService}`} />
              </div>
            </div>
          </div>

          <div className="card-surface p-5">
            <h3 className="mb-4 font-semibold">Recent history</h3>
            <Timeline events={events.length ? events : []} />
            {events.length === 0 && <p className="text-sm text-muted-foreground">No history yet.</p>}
          </div>
        </div>

        <div className="space-y-4">
          <QRCard value={`https://maintainiq.app/public/${asset.id}`} label={asset.name} />
        </div>
      </div>
    </div>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border p-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">{icon} {label}</div>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}
