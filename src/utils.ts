import { Hex, keccak256, namehash } from 'viem'

export function getNodeFromParentNodeAndLabelhash(
  parentNode: Hex,
  labelhash: Hex
) {
  return keccak256((parentNode + labelhash.split('0x')[1]) as Hex)
}

// Safe to use Registrar Controllers since those are only for .eth
export function getEth2LdNodeFromLabelhash(labelhash: Hex) {
  const parent = 'eth'
  const parentNode = namehash(parent)

  return getNodeFromParentNodeAndLabelhash(parentNode, labelhash)
}
