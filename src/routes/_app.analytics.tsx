import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { DashboardCard } from "@/components/DashboardCard";
import { assets, issues } from "@/data/dummy";
import { Boxes, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";

export const Route = createFileRoute("/_app/analytics")({
  head: () => ({ meta: [{ title: "Analytics — MaintainIQ" }] }),
  component: AnalyticsPage,
});

const monthly = [
  { m: "Jan", issues: 12, cost: 320 },
  { m: "Feb", issues: 18, cost: 520 },
  { m: "Mar", issues: 9, cost: 210 },
  { m: "Apr", issues: 24, cost: 780 },
  { m: "May", issues: 15, cost: 410 },
  { m: "Jun", issues: 22, cost: 640 },
  { m: "Jul", issues: 19, cost: 560 },
];
const catData = ["Projector", "Printer", "Laptop", "Air Conditioner", "Generator"].map(c => ({
  name: c, count: assets.filter(a => a.category === c).length + Math.floor(Math.random() * 3),
}));
const priorityData = ["Low", "Medium", "High", "Critical"].map(p => ({
  name: p, value: issues.filter(i => i.priority === p).length,
}));
const colors = ["#94A3B8", "#2563EB", "#F59E0B", "#EF4444"];

function AnalyticsPage() {
  return (
    <div>
      <PageHeader title="Analytics" description="Trends, cost, and reliability across your asset fleet." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
        <StatCard label="Assets tracked" value={assets.length} icon={<Boxes className="h-5 w-5" />} tone="primary" />
        <StatCard label="Open issues" value={issues.filter(i => i.status !== "Resolved").length} icon={<AlertTriangle className="h-5 w-5" />} tone="danger" />
        <StatCard label="Resolved this month" value={12} delta="+18%" icon={<CheckCircle2 className="h-5 w-5" />} tone="success" />
        <StatCard label="Avg. uptime" value="97.4%" delta="↑ 1.2%" icon={<TrendingUp className="h-5 w-5" />} tone="info" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardCard title="Monthly issues" subtitle="Reports over time">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)" }} />
                <Line type="monotone" dataKey="issues" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard title="Priority breakdown" subtitle="Issues by severity">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={priorityData} dataKey="value" nameKey="name" outerRadius={90} paddingAngle={2}>
                  {priorityData.map((_, i) => <Cell key={i} fill={colors[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)" }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard title="Assets by category" subtitle="Coverage across your fleet" className="lg:col-span-2">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={catData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)" }} />
                <Bar dataKey="count" fill="#2563EB" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
