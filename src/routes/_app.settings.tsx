import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — MaintainIQ" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" description="Manage your workspace and preferences." />
      <div className="space-y-6 max-w-3xl">
        <Section title="Organization" description="Public details visible in reports.">
          <Field label="Organization name"><input className="input" defaultValue="Acme Facilities" /></Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Language">
              <select className="input"><option>English</option><option>Español</option><option>Français</option><option>Deutsch</option></select>
            </Field>
            <Field label="Theme">
              <select className="input"><option>Light</option><option>System</option></select>
            </Field>
          </div>
        </Section>

        <Section title="Notifications" description="How and when we alert you.">
          {["Email digests", "New issue reports", "Maintenance reminders", "AI suggestions"].map((l) => (
            <label key={l} className="flex items-center justify-between rounded-xl border border-border p-3">
              <span className="text-sm">{l}</span>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </label>
          ))}
        </Section>

        <div className="card-surface p-6 border-destructive/40 bg-destructive/5">
          <h3 className="font-semibold text-destructive">Danger zone</h3>
          <p className="mt-1 text-sm text-muted-foreground">Irreversible actions. Proceed with caution.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline">Export data</Button>
            <Button variant="danger">Delete workspace</Button>
          </div>
        </div>
      </div>
      <style>{`.input{width:100%;height:2.75rem;border-radius:.75rem;border:1px solid var(--color-border);background:var(--color-card);padding:0 .875rem;font-size:.875rem}`}</style>
    </div>
  );
}
function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="card-surface p-6">
      <h3 className="font-semibold">{title}</h3>
      {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-sm font-medium">{label}</span>{children}</label>;
}
