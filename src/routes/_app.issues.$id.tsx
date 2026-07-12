import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getIssue, users } from "@/data/dummy";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/Button";
import { Timeline } from "@/components/Timeline";
import { history } from "@/data/dummy";

export const Route = createFileRoute("/_app/issues/$id")({
  head: () => ({ meta: [{ title: "Issue details — MaintainIQ" }] }),
  component: IssueDetailsPage,
  notFoundComponent: () => <div className="p-8">Issue not found.</div>,
});

function IssueDetailsPage() {
  const { id } = Route.useParams();
  const issue = getIssue(id);
  if (!issue) throw notFound();

  return (
    <div>
      <PageHeader
        title={issue.title}
        description={`${issue.number} · reported by ${issue.reporter}`}
        actions={
          <>
            <Button variant="outline">Reassign</Button>
            <Button variant="success">Mark resolved</Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <div className="card-surface p-5">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <StatusBadge status={issue.priority} />
              <StatusBadge status={issue.status} />
              <span className="text-xs text-muted-foreground">Created {issue.createdAt}</span>
            </div>
            <p className="text-sm text-muted-foreground">{issue.description}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Info label="Asset" value={<Link to="/assets/$id" params={{ id: issue.assetId }} className="text-primary hover:underline">{issue.assetName}</Link>} />
              <Info label="Category" value={issue.category} />
              <Info label="Reporter" value={issue.reporter} />
              <Info label="Technician" value={issue.technician} />
            </div>
          </div>

          <div className="card-surface p-5">
            <h3 className="mb-3 font-semibold">Evidence</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {[1, 2, 3].map(i => (
                <img key={i} alt="" className="aspect-square w-full rounded-xl object-cover"
                     src={`https://picsum.photos/seed/issue-${issue.id}-${i}/400/400`} />
              ))}
            </div>
          </div>

          <div className="card-surface p-5">
            <h3 className="mb-4 font-semibold">Status timeline</h3>
            <Timeline events={history.slice(0, 5)} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="card-surface p-5">
            <label className="mb-1.5 block text-sm font-medium">Assign technician</label>
            <select className="input">{users.map(u => <option key={u.id}>{u.name}</option>)}</select>
            <label className="mt-4 mb-1.5 block text-sm font-medium">Status</label>
            <select className="input"><option>Open</option><option>In Progress</option><option>Resolved</option><option>Closed</option></select>
            <Button className="mt-4 w-full">Update</Button>
          </div>
        </div>
      </div>
      <style>{`.input{width:100%;height:2.5rem;border-radius:.75rem;border:1px solid var(--color-border);background:var(--color-card);padding:0 .75rem;font-size:.875rem}`}</style>
    </div>
  );
}
function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return <div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 text-sm font-medium">{value}</p></div>;
}
