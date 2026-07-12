import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ScanLine } from "lucide-react";
import { Button } from "@/components/Button";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — MaintainIQ" }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="card-surface w-full max-w-lg p-8">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <ScanLine className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold">MaintainIQ</span>
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">Create your workspace</h1>
        <p className="mt-1 text-sm text-muted-foreground">Get started in seconds — no credit card required.</p>
        <form onSubmit={(e) => { e.preventDefault(); navigate({ to: "/" }); }} className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="Full name"><input className="input" defaultValue="Amelia Chen" /></Field>
          <Field label="Role">
            <select className="input">
              <option>Admin</option><option>Manager</option><option>Technician</option><option>Viewer</option>
            </select>
          </Field>
          <Field label="Email" full><input className="input" type="email" defaultValue="amelia@company.com" /></Field>
          <Field label="Password"><input className="input" type="password" defaultValue="********" /></Field>
          <Field label="Confirm password"><input className="input" type="password" defaultValue="********" /></Field>
          <div className="sm:col-span-2">
            <Button size="lg" className="w-full">Create account</Button>
          </div>
          <p className="sm:col-span-2 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link>
          </p>
        </form>
      </div>
      <style>{`.input{width:100%;height:2.75rem;border-radius:.75rem;border:1px solid var(--color-border);background:var(--color-card);padding:0 .875rem;font-size:.875rem}.input:focus{outline:2px solid var(--color-ring);outline-offset:2px}`}</style>
    </div>
  );
}
function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={full ? "block sm:col-span-2" : "block"}>
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}
