import { createFileRoute } from "@tanstack/react-router";
import { currentUser } from "@/data/dummy";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { KeyRound, Pencil, Mail, Shield } from "lucide-react";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({ meta: [{ title: "Profile — MaintainIQ" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div>
      <PageHeader title="Profile" description="Your personal account details." />
      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] max-w-4xl">
        <div className="card-surface p-6 text-center">
          <img src={currentUser.avatar} alt="" className="mx-auto h-24 w-24 rounded-full object-cover ring-4 ring-primary/10" />
          <h3 className="mt-4 text-lg font-semibold">{currentUser.name}</h3>
          <p className="text-sm text-muted-foreground">{currentUser.role}</p>
          <div className="mt-5 flex flex-col gap-2">
            <Button variant="outline" icon={<Pencil className="h-4 w-4" />}>Edit profile</Button>
            <Button variant="outline" icon={<KeyRound className="h-4 w-4" />}>Change password</Button>
          </div>
        </div>
        <div className="card-surface p-6">
          <h3 className="font-semibold">Account information</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Info icon={<Mail className="h-4 w-4" />} label="Email" value={currentUser.email} />
            <Info icon={<Shield className="h-4 w-4" />} label="Role" value={currentUser.role} />
            <Info label="Member since" value="March 2025" />
            <Info label="Last login" value="Today, 09:42" />
          </div>
          <h3 className="mt-8 font-semibold">Recent activity</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="rounded-xl border border-border p-3">Resolved issue #IS-2004 · today</li>
            <li className="rounded-xl border border-border p-3">Added asset MIQ-1014 · yesterday</li>
            <li className="rounded-xl border border-border p-3">Updated Air Conditioner #5 · 2 days ago</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
function Info({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border p-3">
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">{icon}{label}</p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}
