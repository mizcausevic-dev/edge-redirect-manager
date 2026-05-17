import express from "express";

import { cacheRules, migrationRisk, payload, redirectLane, summary, verification } from "./services/redirectService";
import {
  renderDocs,
  renderMigrationRisk,
  renderOverview,
  renderRedirectLane,
  renderVerification
} from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5286);

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/redirect-lane", (_req, res) => res.type("html").send(renderRedirectLane()));
app.get("/migration-risk", (_req, res) => res.type("html").send(renderMigrationRisk()));
app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/redirect-lane", (_req, res) => res.json(redirectLane()));
app.get("/api/cache-rules", (_req, res) => res.json(cacheRules()));
app.get("/api/migration-risk", (_req, res) => res.json(migrationRisk()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

if (require.main === module) {
  app.listen(port, "127.0.0.1", () => {
    console.log(`Edge Redirect Manager listening on http://127.0.0.1:${port}`);
  });
}

export default app;
