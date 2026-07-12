import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Upload } from "lucide-react";

export const Route = createFileRoute("/_app/maintenance")({
  head: () => ({ meta: [{ title: "Maintenance — MaintainIQ" }] }),
  component: MaintenancePage,
});

function MaintenancePage() {
  return (
    <div>
      <PageHeader title="Maintenance record" description="Log inspection and repair work performed on an asset." />
      <div className="card-surface p-6 max-w-3xl">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Inspection notes" full>
            <textarea className="input min-h-24 py-3" defaultValue="Cleaned intake filter, verified airflow, no residual dust." />
          </Field>
          <Field label="Work done" full>
            <textarea className="input min-h-24 py-3" defaultValue="Replaced cooling fan and re-seated lamp module." />
          </Field>
          <Field label="Parts replaced"><input className="input" defaultValue="Cooling fan SKU-P2201" /></Field>
          <Field label="Cost (USD)"><input className="input" type="number" defaultValue={84} /></Field>
          <Field label="Completion date"><input className="input" type="date" defaultValue="2026-07-08" /></Field>
          <Field label="Technician"><input className="input" defaultValue="Sofia Rossi" /></Field>
          <div className="sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium">Upload photos</span>
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              <Upload className="mb-2 h-6 w-6" />
              Drag & drop or <span className="ml-1 text-primary font-medium">browse</span>
            </div>
          </div>
          <div className="sm:col-span-2 flex justify-end gap-2">
            <Button variant="outline">Save draft</Button>
            <Button variant="success">Mark resolved</Button>
          </div>
        </div>
      </div>
      <style>{`.input{width:100%;height:2.75rem;border-radius:.75rem;border:1px solid var(--color-border);background:var(--color-card);padding:0 .875rem;font-size:.875rem}`}</style>
    </div>
  );
}
function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return <label className={full ? "block sm:col-span-2" : "block"}><span className="mb-1.5 block text-sm font-medium">{label}</span>{children}</label>;
}
