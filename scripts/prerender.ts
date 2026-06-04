import { mkdirSync, writeFileSync } from "fs";
import { cpSync } from "fs";
import { join } from "path";

import {
  renderDocs,
  renderMigrationRisk,
  renderOverview,
  renderRedirectLane,
  renderVerification
} from "../src/services/render";

const siteDir = join(process.cwd(), "site");

mkdirSync(siteDir, { recursive: true });

const routes = [
  { path: "index.html", content: renderOverview() },
  { path: "redirect-lane/index.html", content: renderRedirectLane() },
  { path: "migration-risk/index.html", content: renderMigrationRisk() },
  { path: "verification/index.html", content: renderVerification() },
  { path: "docs/index.html", content: renderDocs() }
];

for (const route of routes) {
  const output = join(siteDir, route.path);
  mkdirSync(join(output, ".."), { recursive: true });
  writeFileSync(output, route.content, "utf8");
}

const workersSource = join(process.cwd(), "workers");
const workersTarget = join(siteDir, "workers");
cpSync(workersSource, workersTarget, { recursive: true });

const kvSource = join(process.cwd(), "kv");
const kvTarget = join(siteDir, "kv");
cpSync(kvSource, kvTarget, { recursive: true });

writeFileSync(
  join(siteDir, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: http://redirects.kineticgain.com/sitemap.xml\n`,
  "utf8"
);

writeFileSync(
  join(siteDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>http://redirects.kineticgain.com/</loc></url>\n  <url><loc>http://redirects.kineticgain.com/redirect-lane/</loc></url>\n  <url><loc>http://redirects.kineticgain.com/migration-risk/</loc></url>\n  <url><loc>http://redirects.kineticgain.com/verification/</loc></url>\n  <url><loc>http://redirects.kineticgain.com/docs/</loc></url>\n</urlset>\n`,
  "utf8"
);
