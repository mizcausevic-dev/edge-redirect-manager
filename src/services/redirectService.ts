import { cacheBehaviors, migrationRisks, redirectRules } from "../data/sampleRedirects";

export function summary() {
  const permanentRules = redirectRules.filter((rule) => rule.type === "301").length;
  const rewrites = redirectRules.filter((rule) => rule.type === "rewrite").length;
  const riskyRoutes = migrationRisks.filter((risk) => risk.risk !== "healthy").length;

  return {
    ruleCount: redirectRules.length,
    permanentRules,
    rewrites,
    riskyRoutes,
    recommendation:
      "Separate campaign rewrites from migration redirects so SEO continuity and attribution continuity do not fight each other at the edge."
  };
}

export function redirectLane() {
  return redirectRules;
}

export function migrationRisk() {
  return migrationRisks;
}

export function cacheRules() {
  return cacheBehaviors;
}

export function verification() {
  return [
    "Redirect logic is modeled as a product surface, not just a loose spreadsheet of old URLs.",
    "Migration risk explains where SEO equity and campaign measurement can break at the same time.",
    "Cache behavior is explicit so teams can reason about edge speed without masking routing mistakes."
  ];
}

export function payload() {
  return {
    dashboard: summary(),
    redirects: redirectLane(),
    cache: cacheRules(),
    migrationRisk: migrationRisk(),
    verification: verification()
  };
}
