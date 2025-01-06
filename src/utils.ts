import { IndexingFunctionArgs } from "@/generated";
import { Hex, keccak256, namehash } from "viem";

export function getNodeFromParentNodeAndLabelhash(
  parentNode: Hex,
  labelhash: Hex
) {
  return keccak256((parentNode + labelhash.split("0x")[1]) as Hex);
}

// Safe to use Registrar Controllers since those are only for .eth
export function getEth2LdNodeFromLabelhash(labelhash: Hex) {
  const parent = "eth";
  const parentNode = namehash(parent);

  return getNodeFromParentNodeAndLabelhash(parentNode, labelhash);
}

export function hasNullBytes(str: string) {
  return /\0/.test(str);
}

export function removeNullBytes(str: string) {
  return str.replace(/\0/g, "");
}

export function checkEventArgs(event: any, eventName: string) {
  for (const [key, value] of Object.entries(event.args)) {
    if (typeof value === "string" && hasNullBytes(value)) {
      console.log(`Found null bytes in ${eventName}`, { key, value });
      console.log(event.log);
      console.log(event.args);
    }
  }
}
