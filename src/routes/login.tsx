import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ScanLine } from "lucide-react";
import { Button } from "@/components/Button";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in — MaintainIQ" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20">
        <Link to="/" className="flex items-center gap-2 mb-10">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <ScanLine className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold">MaintainIQ</span>
        </Link>
        <div className="max-w-sm w-full mx-auto">
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to your maintenance workspace.</p>
          <form onSubmit={(e) => { e.preventDefault(); navigate({ to: "/" }); }} className="mt-8 space-y-4">
            <Field label="Email"><input type="email" defaultValue="amelia@maintainiq.io" className="input" /></Field>
            <Field label="Password"><input type="password" defaultValue="password" className="input" /></Field>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded" /> Remember me</label>
              <a className="text-primary hover:underline" href="#">Forgot password?</a>
            </div>
            <Button size="lg" className="w-full">Sign in</Button>
            <p className="text-center text-sm text-muted-foreground">
              No account? <Link to="/signup" className="text-primary hover:underline">Create one</Link>
            </p>
          </form>
        </div>
      </div>
      {/* Right */}
      <div className="hidden lg:flex items-center justify-center relative bg-gradient-to-br from-primary/10 via-info/10 to-background overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.15),transparent_50%)]" />
        <div className="relative max-w-md text-center p-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-elevated">
            <ScanLine className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">Every asset. Every issue. One scan away.</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            MaintainIQ turns every QR code into a live maintenance record — with AI diagnostics baked in.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {["Track", "Scan", "Resolve"].map((t) => (
              <div key={t} className="card-surface p-3 text-xs font-medium">{t}</div>
            ))}
          </div>
        </div>
      </div>
      <style>{`.input{width:100%;height:2.75rem;border-radius:.75rem;border:1px solid var(--color-border);background:var(--color-card);padding:0 .875rem;font-size:.875rem}.input:focus{outline:2px solid var(--color-ring);outline-offset:2px}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}
