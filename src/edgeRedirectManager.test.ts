import { describe, expect, it } from "vitest";

import { cacheRules, migrationRisk, payload, summary } from "./services/redirectService";

describe("edge-redirect-manager", () => {
  it("summary exposes edge posture", () => {
    const result = summary();

    expect(result.ruleCount).toBeGreaterThan(0);
    expect(result.permanentRules).toBeGreaterThan(0);
    expect(result.recommendation).toContain("campaign");
  });

  it("cache rules and migration risk stay commercially legible", () => {
    expect(cacheRules().length).toBeGreaterThan(1);
    expect(migrationRisk().some((risk) => risk.explanation.includes("attribution"))).toBe(true);
  });

  it("payload bundles the full routing surface", () => {
    const result = payload();

    expect(result.dashboard.ruleCount).toBe(result.redirects.length);
    expect(result.cache.length).toBeGreaterThan(0);
    expect(result.migrationRisk.length).toBeGreaterThan(0);
    expect(result.verification.length).toBe(3);
  });
});
