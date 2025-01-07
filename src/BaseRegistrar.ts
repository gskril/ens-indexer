import { ponder } from 'ponder:registry'
import { toHex } from 'viem'

import { getEth2LdNodeFromLabelhash } from './utils'
import { name } from '../ponder.schema'

// This is the first record of a .eth 2LD onchain
ponder.on('BaseRegistrar:Transfer', async ({ event, context }) => {
  const { to, tokenId } = event.args

  const labelhash = toHex(tokenId)
  const node = getEth2LdNodeFromLabelhash(labelhash)

  await context.db
    .insert(name)
    .values({
      id: node,
      labelhash,
      owner: to,
      createdAt: event.block.timestamp,
    })
    .onConflictDoUpdate(() => ({
      owner: to,
    }))
})

// `NameRegistered` is always emitted after `Transfer`
ponder.on('BaseRegistrar:NameRegistered', async ({ event, context }) => {
  const { id: tokenId, expires } = event.args

  const labelhash = toHex(tokenId)
  const node = getEth2LdNodeFromLabelhash(labelhash)

  // We don't need to update `owner` here because it's already handled in `Transfer`
  await context.db
    .update(name, { id: node })
    .set(() => ({ expiresAt: expires }))
})

ponder.on('BaseRegistrar:NameRenewed', async ({ event, context }) => {
  const { id: tokenId, expires } = event.args

  const labelhash = toHex(tokenId)
  const node = getEth2LdNodeFromLabelhash(labelhash)

  await context.db
    .update(name, { id: node })
    .set(() => ({ expiresAt: expires }))
})
