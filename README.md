# Edge Redirect Manager

TypeScript control plane for large redirect maps, edge rewrites, campaign continuity, and migration-safe URL behavior.

## Why this exists

Redirect work looks technical until it breaks revenue:
- search equity gets split during migrations
- campaign vanity URLs stop mapping cleanly to live landing pages
- paid traffic lands on stale or mismatched routes
- attribution continuity breaks because rewrites and redirects are handled ad hoc

`edge-redirect-manager` treats edge routing as a growth and platform concern at the same time. It keeps redirect intent, cache behavior, and migration risk visible in one place.

## Routes

- `/`
- `/redirect-lane`
- `/migration-risk`
- `/verification`
- `/docs`

## API

- `/api/dashboard/summary`
- `/api/redirect-lane`
- `/api/cache-rules`
- `/api/migration-risk`
- `/api/verification`
- `/api/sample`

## Screenshots

![Overview](./screenshots/01-overview-proof.png)
![Redirect lane](./screenshots/02-redirect-lane-proof.png)
![Migration risk](./screenshots/03-migration-risk-proof.png)
![Verification](./screenshots/04-verification-proof.png)

## Local Development

```powershell
cd edge-redirect-manager
npm install
npm run dev
```

Open:
- [http://127.0.0.1:5286/](http://127.0.0.1:5286/)
- [http://127.0.0.1:5286/redirect-lane](http://127.0.0.1:5286/redirect-lane)
- [http://127.0.0.1:5286/migration-risk](http://127.0.0.1:5286/migration-risk)
- [http://127.0.0.1:5286/verification](http://127.0.0.1:5286/verification)
- [http://127.0.0.1:5286/docs](http://127.0.0.1:5286/docs)

## Validation

- `npm run build`
- `npm run test`
- `npm run demo`
- `npm run smoke`
- `npm run render:assets`

## Edge Assets

- [workers/edge-worker.ts](./workers/edge-worker.ts)
- [kv/redirect-map.json](./kv/redirect-map.json)

## Docs

- [Architecture](./docs/architecture.md)
- [Origin](./docs/ORIGIN.md)
- [Changelog](./CHANGELOG.md)
