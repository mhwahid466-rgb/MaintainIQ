import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { issues } from "@/data/dummy";
import { PageHeader } from "@/components/PageHeader";
import { SearchBar } from "@/components/SearchBar";
import { Table } from "@/components/Table";
import { StatusBadge } from "@/components/StatusBadge";
import { Plus, Filter } from "lucide-react";

export const Route = createFileRoute("/_app/issues")({
  head: () => ({ meta: [{ title: "Issues — MaintainIQ" }] }),
  component: IssuesPage,
});

function IssuesPage() {
  const [q, setQ] = useState("");
  const rows = issues.filter(i =>
    [i.title, i.number, i.assetName, i.technician].some(x => x.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <div>
      <PageHeader
        title="Issues" description={`${issues.length} issues across your assets`}
        actions={
          <>
            <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-medium hover:bg-accent">
              <Filter className="h-4 w-4" /> Filter
            </button>
            <Link to="/issues/new" className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 shadow-soft">
              <Plus className="h-4 w-4" /> Report Issue
            </Link>
          </>
        }
      />
      <div className="mb-5"><SearchBar value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search issues…" /></div>
      <Table
        rows={rows}
        columns={[
          { key: "number", header: "Issue", render: (i) => <span className="font-mono text-xs">{i.number}</span> },
          { key: "assetName", header: "Asset", render: (i) => (
            <Link to="/assets/$id" params={{ id: i.assetId }} className="hover:underline">
              <span className="font-medium">{i.title}</span>
              <p className="text-xs text-muted-foreground">{i.assetName}</p>
            </Link>
          )},
          { key: "priority", header: "Priority", render: (i) => <StatusBadge status={i.priority} /> },
          { key: "status", header: "Status", render: (i) => <StatusBadge status={i.status} /> },
          { key: "technician", header: "Technician" },
          { key: "createdAt", header: "Created" },
          { key: "actions", header: "", render: (i) => (
            <Link to="/issues/$id" params={{ id: i.id }} className="text-primary text-sm font-medium hover:underline">Open</Link>
          )},
        ]}
      />
    </div>
  );
}
