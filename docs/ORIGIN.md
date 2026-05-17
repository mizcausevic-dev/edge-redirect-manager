# Origin

This repo exists because routing mistakes quietly erase hard-won traffic.

The usual failure modes look familiar:
- replatforming teams move URLs without protecting authority
- campaign teams need vanity paths but do not own the redirect map
- offer tests change destinations without clear cache rules
- analytics teams discover broken continuity after the traffic has already fragmented

`edge-redirect-manager` was designed as a Kinetic Gain portfolio build to show that redirect management is a growth-protection layer, not just a maintenance task.

The operating principle is simple:
- map the move
- model the cache
- flag the migration risk
- keep the edge behavior inspectable
