import { ByteArray, bytesToString, Hex, keccak256, namehash } from 'viem'

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

// Decode a DNS-encoded name
export function bytesToPacket(bytes: ByteArray): string {
  let offset = 0
  let result = ''

  while (offset < bytes.length) {
    const len = bytes[offset]!
    if (len === 0) {
      offset += 1
      break
    }

    result += `${bytesToString(bytes.subarray(offset + 1, offset + len + 1))}.`
    offset += len + 1
  }

  return result.replace(/\.$/, '')
}
