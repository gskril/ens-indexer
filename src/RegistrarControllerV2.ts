import { ponder } from "@/generated";
import { keccak256, namehash, toHex } from "viem";

import { name } from "../ponder.schema";
import { checkEventArgs, getNodeFromParentNodeAndLabelhash } from "./utils";

ponder.on(
  "RegistrarControllerV2:NameRegistered",
  async ({ event, context }) => {
    checkEventArgs(event, "RegistrarControllerV2:NameRegistered");
    const { name: label } = event.args;

    const parentNode = namehash("eth");
    const labelhash = keccak256(toHex(label));
    const node = getNodeFromParentNodeAndLabelhash(parentNode, labelhash);

    // We can ignore the `owner` and `expires` fields since they are already tracked by the BaseRegistrar
    await context.db
      .update(name, { id: node })
      .set(() => ({ name: `${label}.eth`, label }));
  }
);

ponder.on("RegistrarControllerV2:NameRenewed", async () => {
  // We don't need to do anything here since expiration is already tracked by the BaseRegistrar
});
