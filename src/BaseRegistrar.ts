import { ponder } from '@/generated'
import { toHex } from 'viem'
import { getEth2LdNodeFromLabelhash } from './utils'

// This is the first record of a .eth 2LD onchain
ponder.on('BaseRegistrar:Transfer', async ({ event, context }) => {
  const { Name } = context.db
  const { to, tokenId } = event.args

  const labelhash = toHex(tokenId)
  const node = getEth2LdNodeFromLabelhash(labelhash)

  await Name.upsert({
    id: node,
    create: {
      labelhash,
      owner: to,
      createdAt: event.block.timestamp,
    },
    update: {
      owner: to,
    },
  })
})

// `NameRegistered` is always emitted after `Transfer`
ponder.on('BaseRegistrar:NameRegistered', async ({ event, context }) => {
  const { Name } = context.db
  const { id: tokenId, expires } = event.args

  const labelhash = toHex(tokenId)
  const node = getEth2LdNodeFromLabelhash(labelhash)

  await Name.update({
    id: node,
    data: {
      expiresAt: expires,
    },
  })
})

ponder.on('BaseRegistrar:NameRenewed', async ({ event, context }) => {
  const { Name } = context.db
  const { id: tokenId, expires } = event.args

  const labelhash = toHex(tokenId)
  const node = getEth2LdNodeFromLabelhash(labelhash)

  await Name.update({
    id: node,
    data: {
      expiresAt: expires,
    },
  })
})
