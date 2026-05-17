export type RuleType = "301" | "302" | "rewrite";
export type RiskLevel = "healthy" | "watch" | "critical";

export interface RedirectRule {
  id: string;
  sourcePath: string;
  targetPath: string;
  type: RuleType;
  intent: string;
  cachePolicy: string;
  risk: RiskLevel;
}

export interface MigrationRisk {
  id: string;
  routeGroup: string;
  affectedUrls: number;
  risk: RiskLevel;
  explanation: string;
}

export interface CacheBehavior {
  id: string;
  pattern: string;
  ttl: string;
  rationale: string;
}

export const redirectRules: RedirectRule[] = [
  {
    id: "RED-101",
    sourcePath: "/platform/old-security-overview",
    targetPath: "/platform/security/control-plane",
    type: "301",
    intent: "Preserve historical search equity during product taxonomy cleanup.",
    cachePolicy: "edge ttl 24h",
    risk: "healthy"
  },
  {
    id: "RED-102",
    sourcePath: "/lp/q3-demand-sprint",
    targetPath: "/campaigns/q3-demand-sprint",
    type: "rewrite",
    intent: "Keep campaign vanity URLs stable while marketing swaps landing internals.",
    cachePolicy: "bypass for UTM variants",
    risk: "watch"
  },
  {
    id: "RED-103",
    sourcePath: "/pricing-enterprise",
    targetPath: "/pricing?plan=enterprise",
    type: "302",
    intent: "Temporary plan-test split while offer architecture is still moving.",
    cachePolicy: "edge ttl 5m",
    risk: "watch"
  },
  {
    id: "RED-104",
    sourcePath: "/blog/identity-maturity-framework",
    targetPath: "/insights/identity/maturity-framework",
    type: "301",
    intent: "Move a high-performing post into the new insight taxonomy without losing inbound authority.",
    cachePolicy: "edge ttl 7d",
    risk: "healthy"
  },
  {
    id: "RED-105",
    sourcePath: "/trial",
    targetPath: "/get-started/demo",
    type: "rewrite",
    intent: "Unify high-intent traffic under one conversion surface while preserving old entry paths.",
    cachePolicy: "no-store on auth state",
    risk: "critical"
  }
];

export const migrationRisks: MigrationRisk[] = [
  {
    id: "MR-01",
    routeGroup: "legacy product pages",
    affectedUrls: 42,
    risk: "watch",
    explanation: "Old product taxonomy still has mixed canonical patterns and can split search equity if moved without mapped 301 coverage."
  },
  {
    id: "MR-02",
    routeGroup: "campaign vanity URLs",
    affectedUrls: 18,
    risk: "critical",
    explanation: "Campaign rewrites are currently sharing measurement paths with live offer tests, which can break attribution continuity."
  },
  {
    id: "MR-03",
    routeGroup: "blog to insights migration",
    affectedUrls: 63,
    risk: "healthy",
    explanation: "Most content moves are covered, and the remaining gap is primarily link hygiene rather than redirect absence."
  }
];

export const cacheBehaviors: CacheBehavior[] = [
  {
    id: "CACHE-01",
    pattern: "/platform/*",
    ttl: "24h edge cache",
    rationale: "Stable product routes deserve long-lived redirects so crawlers and humans resolve quickly."
  },
  {
    id: "CACHE-02",
    pattern: "/campaigns/*",
    ttl: "bypass on UTM and test parameters",
    rationale: "Campaign traffic needs redirect logic without collapsing experimental attribution paths."
  },
  {
    id: "CACHE-03",
    pattern: "/trial and /pricing*",
    ttl: "5m edge cache with cookie-aware exceptions",
    rationale: "Short-lived caching protects offer tests while preventing stale plan routing."
  }
];
