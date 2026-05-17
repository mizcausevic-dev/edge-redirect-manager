import { payload, summary } from "../src/services/redirectService";

console.log("edge-redirect-manager demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(JSON.stringify(payload().migrationRisk, null, 2));
