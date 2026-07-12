import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Sparkles, Upload } from "lucide-react";

export const Route = createFileRoute("/_app/issues/new")({
  head: () => ({ meta: [{ title: "Report issue — MaintainIQ" }] }),
  component: ReportIssuePage,
});

function ReportIssuePage() {
  return (
    <div>
      <PageHeader title="Report an issue" description="Provide clear details and any evidence. Our AI will suggest next steps." />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="card-surface p-6 space-y-5">
          <Field label="Issue title"><input className="input" defaultValue="Projector overheating during use" /></Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Category">
              <select className="input"><option>Electrical</option><option>Mechanical</option><option>Software</option><option>Cosmetic</option></select>
            </Field>
            <Field label="Priority">
              <select className="input"><option>Low</option><option>Medium</option><option selected>High</option><option>Critical</option></select>
            </Field>
          </div>
          <Field label="Description">
            <textarea className="input min-h-32 py-3" defaultValue="Projector shuts off mid-session. Fan seems loud right before shutdown." />
          </Field>
          <div>
            <span className="mb-1.5 block text-sm font-medium">Upload evidence</span>
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-8 text-center text-sm text-muted-foreground hover:bg-accent/40 transition-colors cursor-pointer">
              <Upload className="mb-2 h-6 w-6" />
              Drag & drop images or <span className="ml-1 text-primary font-medium">browse</span>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Link to="/issues" className="inline-flex h-10 items-center rounded-xl border border-border bg-card px-4 text-sm font-medium hover:bg-accent">Cancel</Link>
            <Button>Submit issue</Button>
          </div>
        </div>

        <div className="card-surface p-5 bg-gradient-to-br from-primary/5 to-info/5 border-primary/20">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <Sparkles className="h-4 w-4" /> AI Suggestion
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Similar past issues suggest a clogged air filter or failing cooling fan.</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="rounded-lg bg-card p-3 ring-1 ring-border">1. Inspect and clean intake filter.</li>
            <li className="rounded-lg bg-card p-3 ring-1 ring-border">2. Verify lamp hours (&gt; 1500h?).</li>
            <li className="rounded-lg bg-card p-3 ring-1 ring-border">3. Order replacement fan (SKU-P2201).</li>
          </ul>
        </div>
      </div>
      <style>{`.input{width:100%;height:2.75rem;border-radius:.75rem;border:1px solid var(--color-border);background:var(--color-card);padding:0 .875rem;font-size:.875rem}.input:focus{outline:2px solid var(--color-ring);outline-offset:2px}`}</style>
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-sm font-medium">{label}</span>{children}</label>;
}
