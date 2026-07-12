import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { assets } from "@/data/dummy";
import { PageHeader } from "@/components/PageHeader";
import { AssetCard } from "@/components/AssetCard";
import { Button } from "@/components/Button";
import { SearchBar } from "@/components/SearchBar";
import { Table } from "@/components/Table";
import { StatusBadge } from "@/components/StatusBadge";
import { LayoutGrid, List, Plus, Filter } from "lucide-react";

export const Route = createFileRoute("/_app/assets")({
  head: () => ({ meta: [{ title: "Assets — MaintainIQ" }] }),
  component: AssetsPage,
});

function AssetsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [q, setQ] = useState("");
  const filtered = assets.filter(a =>
    [a.name, a.code, a.category, a.location].some(x => x.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div>
      <PageHeader
        title="Assets" description={`${assets.length} tracked assets across your facilities`}
        actions={
          <>
            <Button variant="outline" icon={<Filter className="h-4 w-4" />}>Filter</Button>
            <Link to="/assets/new" className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 shadow-soft">
              <Plus className="h-4 w-4" /> Add Asset
            </Link>
          </>
        }
      />
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <SearchBar value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search assets…" />
        <div className="ml-auto inline-flex rounded-xl border border-border bg-card p-1">
          <button onClick={() => setView("grid")} className={`inline-flex h-8 items-center gap-1 rounded-lg px-3 text-xs font-medium ${view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}>
            <LayoutGrid className="h-3.5 w-3.5" /> Grid
          </button>
          <button onClick={() => setView("list")} className={`inline-flex h-8 items-center gap-1 rounded-lg px-3 text-xs font-medium ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}>
            <List className="h-3.5 w-3.5" /> List
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map(a => <AssetCard key={a.id} asset={a} />)}
        </div>
      ) : (
        <Table
          rows={filtered}
          columns={[
            { key: "code", header: "Code", render: (a) => <span className="font-mono text-xs">{a.code}</span> },
            { key: "name", header: "Asset", render: (a) => (
              <div className="flex items-center gap-3">
                <img src={a.image} alt="" className="h-9 w-9 rounded-lg object-cover" />
                <div><p className="font-medium">{a.name}</p><p className="text-xs text-muted-foreground">{a.category}</p></div>
              </div>
            )},
            { key: "location", header: "Location" },
            { key: "technician", header: "Technician" },
            { key: "status", header: "Status", render: (a) => <StatusBadge status={a.status} /> },
            { key: "actions", header: "", render: (a) => (
              <Link to="/assets/$id" params={{ id: a.id }} className="text-primary text-sm font-medium hover:underline">View</Link>
            )},
          ]}
        />
      )}
    </div>
  );
}
