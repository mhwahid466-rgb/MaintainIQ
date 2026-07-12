import { createFileRoute } from "@tanstack/react-router";
import { assets, issues, history } from "@/data/dummy";
import { StatCard } from "@/components/StatCard";
import { DashboardCard } from "@/components/DashboardCard";
import { IssueCard } from "@/components/IssueCard";
import { AssetCard } from "@/components/AssetCard";
import { Timeline } from "@/components/Timeline";
import { Boxes, CheckCircle2, Wrench, AlertTriangle } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from "recharts";

export const Route = createFileRoute("/_app/")({
  head: () => ({ meta: [{ title: "Dashboard — MaintainIQ" }] }),
  component: Dashboard,
});

const barData = [
  { m: "Mon", issues: 4, resolved: 2 },
  { m: "Tue", issues: 6, resolved: 5 },
  { m: "Wed", issues: 3, resolved: 3 },
  { m: "Thu", issues: 8, resolved: 6 },
  { m: "Fri", issues: 5, resolved: 4 },
  { m: "Sat", issues: 2, resolved: 2 },
  { m: "Sun", issues: 1, resolved: 1 },
];
const pieColors = ["#2563EB", "#22C55E", "#F59E0B", "#EF4444", "#94A3B8"];

function Dashboard() {
  const operational = assets.filter(a => a.status === "Operational").length;
  const underM = assets.filter(a => a.status === "Maintenance").length;
  const resolved = issues.filter(i => i.status === "Resolved").length;

  const pieData = ["Operational", "Inspection", "Maintenance", "Out of Service", "Retired"].map(s => ({
    name: s, value: assets.filter(a => a.status === s).length,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Welcome back, Amelia</h1>
        <p className="mt-1 text-sm text-muted-foreground">Here's what's happening across your assets today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Assets" value={assets.length} delta="+2 this week" icon={<Boxes className="h-5 w-5" />} tone="primary" />
        <StatCard label="Operational" value={operational} delta={`${Math.round(operational/assets.length*100)}% healthy`} icon={<CheckCircle2 className="h-5 w-5" />} tone="success" />
        <StatCard label="Under Maintenance" value={underM} icon={<Wrench className="h-5 w-5" />} tone="warning" />
        <StatCard label="Resolved Issues" value={resolved} delta="+5 this month" icon={<AlertTriangle className="h-5 w-5" />} tone="danger" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <DashboardCard title="Weekly activity" subtitle="Issues reported vs resolved" className="lg:col-span-2">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)" }} />
                <Bar dataKey="issues" fill="#2563EB" radius={[8, 8, 0, 0]} />
                <Bar dataKey="resolved" fill="#22C55E" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
        <DashboardCard title="Asset status" subtitle="Distribution by state">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {pieData.map((_, i) => <Cell key={i} fill={pieColors[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)" }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardCard title="Recent issues" subtitle="Newest reports from the field">
          <div className="space-y-3">
            {issues.slice(0, 4).map(i => <IssueCard key={i.id} issue={i} />)}
          </div>
        </DashboardCard>
        <DashboardCard title="Maintenance summary" subtitle="Latest activity">
          <Timeline events={history.slice(0, 5)} />
        </DashboardCard>
      </div>

      <DashboardCard title="Recent assets" subtitle="Recently added or updated">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {assets.slice(0, 4).map(a => <AssetCard key={a.id} asset={a} />)}
        </div>
      </DashboardCard>
    </div>
  );
}
