import { QRCodeSVG } from "qrcode.react";
import { Download, Printer } from "lucide-react";
import { Button } from "./Button";

export function QRCard({ value, label }: { value: string; label?: string }) {
  return (
    <div className="card-surface p-6 text-center">
      <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-2xl bg-white p-4 ring-1 ring-border">
        <QRCodeSVG value={value} size={160} />
      </div>
      {label && <p className="mt-4 text-sm font-medium">{label}</p>}
      <p className="mt-1 text-xs text-muted-foreground break-all">{value}</p>
      <div className="mt-4 flex justify-center gap-2">
        <Button size="sm" variant="outline" icon={<Download className="h-3.5 w-3.5" />}>Download</Button>
        <Button size="sm" variant="outline" icon={<Printer className="h-3.5 w-3.5" />}>Print</Button>
      </div>
    </div>
  );
}
