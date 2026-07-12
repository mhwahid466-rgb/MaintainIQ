import { createFileRoute } from "@tanstack/react-router";
import { history } from "@/data/dummy";
import { PageHeader } from "@/components/PageHeader";
import { Timeline } from "@/components/Timeline";

export const Route = createFileRoute("/_app/history")({
  head: () => ({ meta: [{ title: "History — MaintainIQ" }] }),
  component: () => (
    <div>
      <PageHeader title="History" description="Every event across every asset, in one continuous log." />
      <div className="max-w-3xl"><Timeline events={history} /></div>
    </div>
  ),
});
