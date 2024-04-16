import { ponder } from "@/generated";

ponder.on(
  "ENSRegistryWithFallback:ApprovalForAll",
  async ({ event, context }) => {
    console.log(event.args);
  },
);

ponder.on("ENSRegistryWithFallback:NewOwner", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("ENSRegistryWithFallback:NewResolver", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("ENSRegistryWithFallback:NewTTL", async ({ event, context }) => {
  console.log(event.args);
});
