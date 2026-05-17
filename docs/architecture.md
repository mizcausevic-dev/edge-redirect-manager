# Architecture

## Core idea

`edge-redirect-manager` treats routing as a governed edge layer:
- redirect rules preserve historical URL equity
- rewrites keep marketing paths stable while internals evolve
- cache behavior stays explicit
- migration risk is visible before pages move

## Surface model

- overview
  - redirect counts, rewrite posture, and migration risk summary
- redirect lane
  - rule table with type, cache behavior, and intent
- migration risk
  - route groups most likely to break SEO and campaign continuity
- verification
  - claims about routing discipline and edge safety

## Data model

- `RedirectRule`
  - source path
  - target path
  - type
  - cache policy
  - risk
  - intent
- `MigrationRisk`
  - route group
  - affected URLs
  - risk
  - explanation
- `CacheBehavior`
  - route pattern
  - ttl or bypass behavior
  - rationale

## Edge assets

- `workers/edge-worker.ts`
  - example Cloudflare Worker-style fetch handler
- `kv/redirect-map.json`
  - modeled redirect map payload for edge storage

## Commercial value

This matters because broken routing is not just a platform bug. It can break:
- organic authority
- campaign landing consistency
- attribution continuity
- conversion confidence during migrations
