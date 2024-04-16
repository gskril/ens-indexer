import { createConfig } from "@ponder/core";
import { http } from "viem";

import { ENSRegistryWithFallbackAbi } from "./abis/ENSRegistryWithFallbackAbi";

export default createConfig({
  networks: {
    mainnet: { chainId: 1, transport: http(process.env.PONDER_RPC_URL_1) },
  },
  contracts: {
    ENSRegistryWithFallback: {
      abi: ENSRegistryWithFallbackAbi,
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
      network: "mainnet",
      startBlock: 9380380,
    },
  },
});
