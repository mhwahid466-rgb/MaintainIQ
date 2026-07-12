import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", changefreq: "daily", priority: "1.0" },
          { path: "/assets", changefreq: "daily", priority: "0.9" },
          { path: "/issues", changefreq: "daily", priority: "0.9" },
          { path: "/maintenance", changefreq: "weekly", priority: "0.7" },
          { path: "/history", changefreq: "weekly", priority: "0.6" },
          { path: "/analytics", changefreq: "weekly", priority: "0.7" },
          { path: "/notifications", changefreq: "weekly", priority: "0.5" },
          { path: "/profile", changefreq: "monthly", priority: "0.4" },
          { path: "/settings", changefreq: "monthly", priority: "0.4" },
        ];
        const urls = entries.map(e =>
          `  <url><loc>${BASE_URL}${e.path}</loc><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
