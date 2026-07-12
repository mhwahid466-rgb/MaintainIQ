import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { QRCard } from "@/components/QRCard";
import { useState } from "react";

export const Route = createFileRoute("/_app/assets/new")({
  head: () => ({ meta: [{ title: "Add asset — MaintainIQ" }] }),
  component: AddAssetPage,
});

function AddAssetPage() {
  const [name, setName] = useState("New Projector");
  return (
    <div>
      <PageHeader title="Add asset" description="Register a new asset and generate its QR code." />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="card-surface p-6">
          <form className="grid gap-5 sm:grid-cols-2">
            <Field label="Asset name" full>
              <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
            </Field>
            <Field label="Category">
              <select className="input">
                <option>Projector</option><option>Printer</option><option>Computer</option>
                <option>Laptop</option><option>Air Conditioner</option><option>Generator</option>
                <option>Elevator</option><option>CCTV Camera</option><option>Whiteboard</option><option>Server Rack</option>
              </select>
            </Field>
            <Field label="Location"><input className="input" defaultValue="Building A · Floor 2" /></Field>
            <Field label="Condition">
              <select className="input"><option>Excellent</option><option>Good</option><option>Fair</option><option>Poor</option></select>
            </Field>
            <Field label="Assigned technician"><input className="input" defaultValue="Amelia Chen" /></Field>
            <Field label="Status">
              <select className="input"><option>Operational</option><option>Inspection</option><option>Maintenance</option><option>Out of Service</option><option>Retired</option></select>
            </Field>
            <Field label="Last service"><input className="input" type="date" defaultValue="2026-06-20" /></Field>
            <Field label="Next service"><input className="input" type="date" defaultValue="2026-09-20" /></Field>
            <Field label="Description" full>
              <textarea className="input min-h-24 py-3" defaultValue="High-lumen conference-room projector, replaced lamp last cycle." />
            </Field>
            <div className="sm:col-span-2 flex justify-end gap-2">
              <Link to="/assets" className="inline-flex h-10 items-center rounded-xl border border-border bg-card px-4 text-sm font-medium hover:bg-accent">Cancel</Link>
              <Button>Save Asset</Button>
            </div>
          </form>
        </div>
        <div className="space-y-4">
          <QRCard value={`https://maintainiq.app/public/new-asset`} label={name} />
          <div className="card-surface p-4 text-sm text-muted-foreground">
            The QR code will be regenerated once the asset is saved and can be printed as a sticker.
          </div>
        </div>
      </div>
      <style>{`.input{width:100%;height:2.75rem;border-radius:.75rem;border:1px solid var(--color-border);background:var(--color-card);padding:0 .875rem;font-size:.875rem}.input:focus{outline:2px solid var(--color-ring);outline-offset:2px}`}</style>
    </div>
  );
}
function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={full ? "block sm:col-span-2" : "block"}>
      <span className="mb-1.5 block text-sm font-medium">{label}</span>{children}
    </label>
  );
}
