import { Link } from "@tanstack/react-router";
import { QRCodeSVG } from "qrcode.react";
import type { Asset } from "@/data/dummy";
import { StatusBadge } from "./StatusBadge";
import { Button } from "./Button";
import { Eye, Pencil, QrCode, Trash2, MapPin } from "lucide-react";

export function AssetCard({ asset }: { asset: Asset }) {
  return (
    <div className="card-surface overflow-hidden transition-all hover:shadow-elevated hover:-translate-y-0.5 group">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img src={asset.image} alt={asset.name}
             className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute top-3 left-3"><StatusBadge status={asset.status} /></div>
        <div className="absolute bottom-3 right-3 rounded-xl bg-card/95 backdrop-blur p-2 shadow-soft">
          <QRCodeSVG value={`https://maintainiq.app/public/${asset.id}`} size={44} />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-semibold">{asset.name}</h3>
            <p className="text-xs text-muted-foreground">{asset.code}</p>
          </div>
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> {asset.location}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <Button size="sm" variant="outline" icon={<QrCode className="h-3.5 w-3.5" />}>QR</Button>
          <Link to="/assets/$id" params={{ id: asset.id }}
                className="inline-flex h-8 items-center gap-1.5 rounded-xl bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90">
            <Eye className="h-3.5 w-3.5" /> View
          </Link>
          <Button size="icon" variant="ghost" className="h-8 w-8 ml-auto"><Pencil className="h-3.5 w-3.5" /></Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
        </div>
      </div>
    </div>
  );
}
