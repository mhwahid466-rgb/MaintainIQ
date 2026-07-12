export type AssetStatus = "Operational" | "Inspection" | "Maintenance" | "Out of Service" | "Retired";
export type IssuePriority = "Low" | "Medium" | "High" | "Critical";
export type IssueStatus = "Open" | "In Progress" | "Resolved" | "Closed";

export interface Asset {
  id: string;
  code: string;
  name: string;
  category: string;
  location: string;
  status: AssetStatus;
  condition: "Excellent" | "Good" | "Fair" | "Poor";
  technician: string;
  lastService: string;
  nextService: string;
  description: string;
  image: string;
}

export interface Issue {
  id: string;
  number: string;
  title: string;
  assetId: string;
  assetName: string;
  category: string;
  priority: IssuePriority;
  status: IssueStatus;
  reporter: string;
  technician: string;
  createdAt: string;
  description: string;
}

export interface HistoryEvent {
  id: string;
  date: string;
  assetId: string;
  action: string;
  user: string;
  status: string;
  type: "created" | "maintenance" | "issue" | "resolved" | "inspection";
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Technician" | "Viewer";
  avatar: string;
}

const img = (seed: string) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=800&q=60`;

const IMAGES: Record<string, string> = {
  Projector: img("1517481143416-a25a5f5b7fd7"),
  Printer: img("1612815154858-60aa4c59eaa6"),
  Computer: img("1518770660439-4636190af475"),
  Laptop: img("1496181133206-80ce9b88a853"),
  "Air Conditioner": img("1631545308456-3e2f6cddcf70"),
  Generator: img("1581092160562-40aa08e78837"),
  Elevator: img("1497366216548-37526070297c"),
  "CCTV Camera": img("1557318041-1ce374d55ebf"),
  Whiteboard: img("1503676260728-1c00da094a0b"),
  "Server Rack": img("1558494949-ef010cbdcc31"),
};

const CATEGORIES = Object.keys(IMAGES);
const LOCATIONS = [
  "Building A · Floor 1", "Building A · Floor 2", "Building B · Floor 3",
  "Warehouse · Bay 4", "Conference Room 201", "Data Center · Row C",
  "Reception", "Lab · Room 12", "Rooftop", "Parking · Level B1",
];
const TECHS = ["Amelia Chen", "Marcus Reed", "Sofia Rossi", "Daniel Park", "Priya Nair"];
const STATUSES: AssetStatus[] = ["Operational", "Inspection", "Maintenance", "Out of Service", "Retired"];

function pick<T>(arr: T[], i: number): T { return arr[i % arr.length]; }

export const assets: Asset[] = Array.from({ length: 15 }).map((_, i) => {
  const category = pick(CATEGORIES, i);
  const status = pick(STATUSES, i);
  return {
    id: `a${i + 1}`,
    code: `MIQ-${String(1000 + i)}`,
    name: `${category} #${i + 1}`,
    category,
    location: pick(LOCATIONS, i * 3),
    status,
    condition: pick(["Excellent", "Good", "Fair", "Poor"] as const, i),
    technician: pick(TECHS, i * 2),
    lastService: new Date(Date.now() - (i + 1) * 86400000 * 12).toISOString().slice(0, 10),
    nextService: new Date(Date.now() + (i + 2) * 86400000 * 20).toISOString().slice(0, 10),
    description:
      `${category} unit installed on-site. Regularly inspected, part of the facility's ${category.toLowerCase()} maintenance rotation.`,
    image: IMAGES[category],
  };
});

const ISSUE_TITLES = [
  "Overheating during operation", "Not powering on", "Loud grinding noise",
  "Toner low warning", "Network connectivity dropping", "Water leak observed",
  "Fan speed abnormal", "Display flickering", "Firmware out of date",
  "Battery not charging", "Unusual vibration", "Error code E-042",
];

export const issues: Issue[] = Array.from({ length: 20 }).map((_, i) => {
  const a = pick(assets, i);
  return {
    id: `i${i + 1}`,
    number: `#IS-${2000 + i}`,
    title: pick(ISSUE_TITLES, i),
    assetId: a.id,
    assetName: a.name,
    category: a.category,
    priority: pick(["Low", "Medium", "High", "Critical"] as const, i),
    status: pick(["Open", "In Progress", "Resolved", "Closed"] as const, i),
    reporter: pick(["John Doe", "Sara Kim", "Alex Grant", "Maya Iyer"], i),
    technician: pick(TECHS, i),
    createdAt: new Date(Date.now() - (i + 1) * 86400000 * 2).toISOString().slice(0, 10),
    description:
      "Reported through the public QR scan flow. Requires on-site inspection and diagnostic run before parts replacement.",
  };
});

export const history: HistoryEvent[] = Array.from({ length: 18 }).map((_, i) => ({
  id: `h${i + 1}`,
  date: new Date(Date.now() - i * 86400000 * 1.5).toISOString().slice(0, 10),
  assetId: pick(assets, i).id,
  action: pick([
    "Asset created", "Routine inspection completed", "Issue reported",
    "Maintenance completed", "Parts replaced", "Firmware updated",
    "Status changed to Operational", "QR reprinted",
  ], i),
  user: pick([...TECHS, "System"], i),
  status: pick(["Success", "Info", "Warning"], i),
  type: pick(["created", "maintenance", "issue", "resolved", "inspection"] as const, i),
}));

export const users: AppUser[] = [
  { id: "u1", name: "Amelia Chen", email: "amelia@maintainiq.io", role: "Admin", avatar: "https://i.pravatar.cc/120?img=47" },
  { id: "u2", name: "Marcus Reed", email: "marcus@maintainiq.io", role: "Manager", avatar: "https://i.pravatar.cc/120?img=12" },
  { id: "u3", name: "Sofia Rossi", email: "sofia@maintainiq.io", role: "Technician", avatar: "https://i.pravatar.cc/120?img=32" },
  { id: "u4", name: "Daniel Park", email: "daniel@maintainiq.io", role: "Technician", avatar: "https://i.pravatar.cc/120?img=15" },
];

export const currentUser: AppUser = users[0];

export const notifications = Array.from({ length: 8 }).map((_, i) => ({
  id: `n${i + 1}`,
  title: pick([
    "New issue reported on Printer #3",
    "Maintenance scheduled tomorrow",
    "Amelia resolved issue #IS-2004",
    "AI suggested a spare-part order",
    "Weekly analytics ready",
    "Asset moved to Out of Service",
  ], i),
  time: `${i + 1}h ago`,
  read: i > 2,
  type: pick(["issue", "maintenance", "info", "ai", "report"], i) as string,
}));

export function getAsset(id: string) { return assets.find(a => a.id === id); }
export function getIssue(id: string) { return issues.find(i => i.id === id); }
export function getAssetHistory(id: string) { return history.filter(h => h.assetId === id); }
