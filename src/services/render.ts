import { cacheRules, migrationRisk, redirectLane, summary, verification } from "./redirectService";

function layout(title: string, activePath: string, body: string) {
  const nav = [
    { href: "/", label: "Overview" },
    { href: "/redirect-lane", label: "Redirect Lane" },
    { href: "/migration-risk", label: "Migration Risk" },
    { href: "/verification", label: "Verification" },
    { href: "/docs", label: "Docs" }
  ]
    .map((item) => {
      const active = item.href === activePath ? "nav-chip active" : "nav-chip";
      return `<a class="${active}" href="${item.href}">${item.label}</a>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <style>
      :root {
        --bg: #07111d;
        --panel: rgba(15, 27, 44, 0.9);
        --line: rgba(123, 164, 255, 0.16);
        --text: #eef4ff;
        --muted: #97abc7;
        --accent: #63c0ff;
        --accent-strong: #6577ff;
        --good: #39d98a;
        --watch: #f1bd55;
        --critical: #ff6d84;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", Inter, sans-serif;
        color: var(--text);
        background:
          radial-gradient(circle at top left, rgba(99, 192, 255, 0.18), transparent 28%),
          radial-gradient(circle at top right, rgba(101, 119, 255, 0.16), transparent 26%),
          linear-gradient(180deg, #05101b 0%, var(--bg) 100%);
      }
      a { color: inherit; text-decoration: none; }
      .shell { max-width: 1280px; margin: 0 auto; padding: 28px 28px 40px; }
      .topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        padding: 16px 18px;
        border: 1px solid var(--line);
        background: rgba(8, 16, 28, 0.82);
        border-radius: 24px;
      }
      .brand { display: flex; gap: 14px; align-items: center; }
      .brand-mark {
        width: 42px; height: 42px; display: grid; place-items: center;
        border-radius: 14px;
        background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
        font-weight: 800;
      }
      .eyebrow {
        margin: 0 0 2px;
        font-size: 12px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: #90cbff;
      }
      .brand-title { margin: 0; font-size: 24px; font-weight: 700; }
      .brand-subtitle { margin: 4px 0 0; color: var(--muted); font-size: 14px; }
      nav { display: flex; flex-wrap: wrap; gap: 10px; justify-content: flex-end; }
      .nav-chip {
        padding: 12px 16px; border-radius: 999px; border: 1px solid var(--line);
        background: rgba(14, 25, 41, 0.9); color: #dce8ff; font-size: 13px;
        letter-spacing: 0.06em; text-transform: uppercase;
      }
      .nav-chip.active {
        background: linear-gradient(135deg, rgba(99, 192, 255, 0.95), rgba(101, 119, 255, 0.92));
        border-color: transparent; color: white; box-shadow: 0 10px 24px rgba(72, 129, 255, 0.32);
      }
      .hero {
        margin-top: 24px; padding: 30px 30px 34px; border-radius: 30px;
        border: 1px solid var(--line);
        background: linear-gradient(180deg, rgba(13, 24, 40, 0.95), rgba(9, 19, 33, 0.92));
      }
      .hero h1 {
        margin: 8px 0 10px; max-width: 920px;
        font-size: clamp(40px, 4.8vw, 66px); line-height: 0.96; letter-spacing: -0.04em;
      }
      .hero p { max-width: 860px; margin: 0; font-size: 21px; line-height: 1.5; color: #b6c8e5; }
      .section { margin-top: 24px; display: grid; gap: 20px; }
      .metrics { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
      .panel { padding: 22px; border-radius: 26px; border: 1px solid var(--line); background: var(--panel); }
      .depth-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
      .depth-card {
        padding: 20px; border-radius: 24px; border: 1px solid rgba(123, 164, 255, 0.18);
        background: linear-gradient(180deg, rgba(15, 27, 44, 0.86), rgba(9, 19, 33, 0.72));
      }
      .depth-card h3 { margin: 10px 0; font-size: 24px; line-height: 1.1; letter-spacing: -0.02em; }
      .depth-card p { margin: 0; color: var(--muted); font-size: 15px; line-height: 1.58; }
      .story { border-left: 4px solid var(--accent); }
      .workflow-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
      .workflow-card {
        padding: 20px; border-radius: 24px; border: 1px solid rgba(123, 164, 255, 0.18);
        background: rgba(6, 15, 27, 0.72);
      }
      .workflow-card h3 { margin: 10px 0; font-size: 22px; line-height: 1.16; }
      .workflow-card p { margin: 0; color: var(--muted); font-size: 15px; line-height: 1.58; }
      .metric-label { color: #8fb6ea; letter-spacing: 0.18em; font-size: 12px; text-transform: uppercase; }
      .metric-value { margin-top: 14px; font-size: 44px; font-weight: 750; line-height: 1; }
      .metric-copy { margin-top: 12px; font-size: 14px; color: var(--muted); line-height: 1.5; }
      .cols-2 { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 20px; }
      .table { width: 100%; border-collapse: collapse; margin-top: 14px; }
      .table th, .table td {
        padding: 14px 10px; border-bottom: 1px solid rgba(143, 182, 234, 0.11);
        text-align: left; vertical-align: top;
      }
      .table th { color: #8fb6ea; font-size: 12px; text-transform: uppercase; letter-spacing: 0.16em; }
      .table td { color: #e9f1ff; font-size: 14px; line-height: 1.45; }
      .tag {
        display: inline-flex; align-items: center; padding: 6px 10px; border-radius: 999px;
        font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;
      }
      .healthy { background: rgba(57, 217, 138, 0.15); color: var(--good); }
      .watch { background: rgba(241, 189, 85, 0.15); color: var(--watch); }
      .critical { background: rgba(255, 109, 132, 0.15); color: var(--critical); }
      .edge { background: rgba(99, 192, 255, 0.14); color: var(--accent); }
      .section-title { margin: 0; font-size: 28px; line-height: 1.1; }
      .section-copy { margin: 10px 0 0; color: var(--muted); font-size: 16px; line-height: 1.55; }
      ul.clean { margin: 16px 0 0; padding-left: 18px; color: #dbe7fb; }
      ul.clean li { margin-top: 10px; line-height: 1.5; }
      code { background: rgba(14, 25, 41, 0.9); padding: 2px 6px; border-radius: 8px; }
      .site-footer {
        margin-top: 30px; padding: 20px 4px 0; display: flex; flex-wrap: wrap; gap: 14px;
        color: var(--muted); font-size: 13px; border-top: 1px solid rgba(143, 182, 234, 0.12);
      }
      .site-footer a { color: #dce8ff; }
      @media (max-width: 1100px) {
        .metrics, .cols-2, .workflow-grid { grid-template-columns: 1fr; }
        nav { justify-content: flex-start; }
        .topbar { flex-direction: column; align-items: flex-start; }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <header class="topbar">
        <div class="brand">
          <div class="brand-mark">ER</div>
          <div>
            <p class="eyebrow">Platform Engineering</p>
            <h1 class="brand-title">Edge Redirect Manager</h1>
            <p class="brand-subtitle">Migration-safe routing, campaign continuity, and URL equity protection at the edge.</p>
          </div>
        </div>
        <nav>${nav}</nav>
      </header>
      ${body}
      <footer class="site-footer">
        <a href="http://redirects.kineticgain.com/">redirects.kineticgain.com</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
        <a href="https://portfolio.kineticgain.com/">Portfolio</a>
        <a href="https://github.com/mizcausevic-dev/edge-redirect-manager">GitHub</a>
        <a href="/docs">Docs</a>
      </footer>
    </main>
  </body>
</html>`;
}

function productDepthSection() {
  return `
    <section class="section">
      <article class="panel">
        <p class="eyebrow">What this product does</p>
        <h2 class="section-title">Edge Redirect Manager turns URL changes into a controlled revenue, SEO, and platform release system.</h2>
        <p class="section-copy">The product keeps redirect rules, cache behavior, campaign rewrites, and migration risk visible in one board-readable surface so site changes do not silently break attribution, search equity, paid traffic, or buyer trust.</p>
        <div class="depth-grid">
          <div class="depth-card story">
            <p class="eyebrow">SaaS go-to-market analyst lens</p>
            <h3>Protects demand capture during migrations and campaign changes.</h3>
            <p>Marketing can see which routes preserve branded traffic, paid campaign paths, trial flows, partner links, and high-intent landing pages before a launch turns into broken measurement or lost pipeline.</p>
          </div>
          <div class="depth-card">
            <p class="eyebrow">SaaS value architect lens</p>
            <h3>Connects technical URL hygiene to measurable business risk.</h3>
            <p>The surface frames redirects as revenue infrastructure: fewer dead ends, cleaner attribution, stronger SEO continuity, and less platform toil when web properties, CMS paths, and campaign routes change.</p>
          </div>
          <div class="depth-card">
            <p class="eyebrow">Technical proof</p>
            <h3>Models redirect intent, cache posture, migration risk, and JSON outputs.</h3>
            <p>Engineers can inspect the rule table, migration-risk register, cache classes, API outputs, smoke checks, and prerendered static site instead of treating the page as a thin marketing wrapper.</p>
          </div>
          <div class="depth-card">
            <p class="eyebrow">What these repos have in common</p>
            <h3>They turn hidden platform operations into operator-safe decision surfaces.</h3>
            <p>Across Kinetic Gain, each repo makes an invisible failure mode explicit, attaches it to a buyer-readable outcome, and gives both technical and non-technical reviewers a concrete artifact to inspect.</p>
          </div>
        </div>
      </article>
    </section>`;
}

function operatingWorkflowSection() {
  return `
    <section class="section">
      <article class="panel">
        <p class="eyebrow">Operating workflow</p>
        <h2 class="section-title">The page explains who should act, what breaks, and how the redirect map proves the fix.</h2>
        <p class="section-copy">A useful redirect system has to speak to SEO, RevOps, platform engineering, and executives at once. This section makes the handoff explicit so reviewers can understand the product without reading the source code first.</p>
        <div class="workflow-grid" style="margin-top: 18px;">
          <div class="workflow-card">
            <p class="eyebrow">Before launch</p>
            <h3>Map every route to intent and owner.</h3>
            <p>Classify the path as SEO continuity, campaign continuity, migration cleanup, or application routing. Each rule needs a clear owner and a reason it exists.</p>
          </div>
          <div class="workflow-card">
            <p class="eyebrow">During release</p>
            <h3>Watch breakage where business value is highest.</h3>
            <p>Prioritize pricing, demo, trial, docs, partner, and high-authority pages so paid and organic traffic do not disappear into stale URLs.</p>
          </div>
          <div class="workflow-card">
            <p class="eyebrow">After release</p>
            <h3>Turn routing outcomes into evidence.</h3>
            <p>Use the JSON outputs, static proof pages, and screenshots to show which risks were contained and which routes still need cleanup before the next launch.</p>
          </div>
        </div>
      </article>
    </section>`;
}

export function renderOverview() {
  const stats = summary();
  const cacheList = cacheRules()
    .map((rule) => `<li><strong>${rule.pattern}</strong> — ${rule.rationale}</li>`)
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Edge Routing Control Plane</p>
      <h1>Redirects protect more than SEO. They protect campaigns, attribution, and inbound trust.</h1>
      <p>Manage redirect maps, campaign rewrites, and migration-safe routing so high-intent traffic keeps resolving cleanly while marketing, SEO, and platform teams change the site underneath it.</p>
    </section>
    ${productDepthSection()}
    <section class="section">
      <div class="metrics">
        <article class="panel">
          <div class="metric-label">Rules</div>
          <div class="metric-value">${stats.ruleCount}</div>
          <div class="metric-copy">Modeled redirect and rewrite rules active at the edge.</div>
        </article>
        <article class="panel">
          <div class="metric-label">301 Rules</div>
          <div class="metric-value">${stats.permanentRules}</div>
          <div class="metric-copy">Permanent moves preserving URL equity and historical inbound value.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Rewrites</div>
          <div class="metric-value">${stats.rewrites}</div>
          <div class="metric-copy">Campaign and funnel rewrites that preserve vanity routes and testing freedom.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Risk Groups</div>
          <div class="metric-value">${stats.riskyRoutes}</div>
          <div class="metric-copy">Route clusters where migration and measurement can break together.</div>
        </article>
      </div>
      <div class="cols-2">
        <article class="panel">
          <p class="eyebrow">Recommendation</p>
          <h2 class="section-title">What to separate next</h2>
          <p class="section-copy">${stats.recommendation}</p>
        </article>
        <article class="panel">
          <p class="eyebrow">Cache Behavior</p>
          <h2 class="section-title">How the edge should treat route classes.</h2>
          <ul class="clean">${cacheList}</ul>
        </article>
      </div>
    </section>`;

  return layout("Edge Redirect Manager", "/", `${body}${operatingWorkflowSection()}`);
}

export function renderRedirectLane() {
  const rows = redirectLane()
    .map(
      (rule) => `
      <tr>
        <td>${rule.sourcePath}</td>
        <td>${rule.targetPath}</td>
        <td><span class="tag edge">${rule.type}</span></td>
        <td>${rule.cachePolicy}</td>
        <td><span class="tag ${rule.risk}">${rule.risk}</span></td>
        <td>${rule.intent}</td>
      </tr>`
    )
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Redirect Lane</p>
      <h1>Route intent should be legible before the edge starts rewriting traffic.</h1>
      <p>This lane shows which URLs are being permanently moved, temporarily diverted, or transparently rewritten so teams can protect campaigns and migrations without guessing what the edge is doing.</p>
    </section>
    <section class="section">
      <article class="panel">
        <p class="eyebrow">Redirect Rules</p>
        <h2 class="section-title">Rule posture by path, cache behavior, and risk.</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Source</th>
              <th>Target</th>
              <th>Type</th>
              <th>Cache</th>
              <th>Risk</th>
              <th>Intent</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </article>
    </section>`;

  return layout("Edge Redirect Manager - Redirect Lane", "/redirect-lane", `${body}${operatingWorkflowSection()}`);
}

export function renderMigrationRisk() {
  const riskRows = migrationRisk()
    .map(
      (risk) => `
      <tr>
        <td>${risk.routeGroup}</td>
        <td>${risk.affectedUrls}</td>
        <td><span class="tag ${risk.risk}">${risk.risk}</span></td>
        <td>${risk.explanation}</td>
      </tr>`
    )
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Migration Risk</p>
      <h1>The dangerous routes are the ones where SEO continuity and campaign continuity break together.</h1>
      <p>Migration risk is not just about broken links. It is about losing URL equity, splitting attribution, and sending paid or branded traffic into dead ends during site changes.</p>
    </section>
    <section class="section">
      <article class="panel">
        <p class="eyebrow">Risk Register</p>
        <h2 class="section-title">Route groups that need migration discipline first.</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Route Group</th>
              <th>Affected URLs</th>
              <th>Risk</th>
              <th>Why it matters</th>
            </tr>
          </thead>
          <tbody>${riskRows}</tbody>
        </table>
      </article>
    </section>`;

  return layout("Edge Redirect Manager - Migration Risk", "/migration-risk", `${body}${operatingWorkflowSection()}`);
}

export function renderVerification() {
  const body = `
    <section class="hero">
      <p class="eyebrow">Verification</p>
      <h1>This build proves routing belongs in the growth stack as much as the platform stack.</h1>
      <p>When redirects are treated as technical leftovers, teams lose search authority and campaign integrity. This repo keeps those tradeoffs explicit.</p>
    </section>
    <section class="section">
      <article class="panel">
        <p class="eyebrow">Release Checks</p>
        <h2 class="section-title">What this repo validates</h2>
        <ul class="clean">
          ${verification().map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
    </section>`;

  return layout("Edge Redirect Manager - Verification", "/verification", `${body}${operatingWorkflowSection()}`);
}

export function renderDocs() {
  const body = `
    <section class="hero">
      <p class="eyebrow">Docs</p>
      <h1>Modeled as an edge-routing control plane for migrations and campaigns.</h1>
      <p>This repo combines route logic, cache strategy, and migration risk so platform teams can protect inbound continuity while the site structure evolves.</p>
    </section>
    ${productDepthSection()}
    <section class="section">
      <div class="cols-2">
        <article class="panel">
          <p class="eyebrow">Routes</p>
          <h2 class="section-title">UI surface</h2>
          <ul class="clean">
            <li><code>/</code> overview and edge posture</li>
            <li><code>/redirect-lane</code> redirect and rewrite rule table</li>
            <li><code>/migration-risk</code> route-group risk register</li>
            <li><code>/verification</code> release checks and modeling claims</li>
          </ul>
        </article>
        <article class="panel">
          <p class="eyebrow">API</p>
          <h2 class="section-title">Machine-readable outputs</h2>
          <ul class="clean">
            <li><code>/api/dashboard/summary</code></li>
            <li><code>/api/redirect-lane</code></li>
            <li><code>/api/cache-rules</code></li>
            <li><code>/api/migration-risk</code></li>
            <li><code>/api/verification</code></li>
            <li><code>/api/sample</code></li>
          </ul>
        </article>
      </div>
    </section>`;

  return layout("Edge Redirect Manager - Docs", "/docs", `${body}${operatingWorkflowSection()}`);
}
