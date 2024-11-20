import { ponder } from '@/generated'

import { getNodeFromParentNodeAndLabelhash } from './utils'
import { name } from '../ponder.schema'

// Logged when the owner of a node assigns a new owner to a subnode.
// This is the first record of a 3LD+ onchain.
ponder.on('Registry:NewOwner', async ({ event, context }) => {
  const { node: parentNode, label: labelhash, owner } = event.args

  const node = getNodeFromParentNodeAndLabelhash(parentNode, labelhash)

  await context.db
    .insert(name)
    .values({
      id: node,
      parentId: parentNode,
      labelhash,
      owner,
      createdAt: event.block.timestamp,
    })
    .onConflictDoUpdate(() => ({
      labelhash,
      owner,
    }))
})

// Logged when the resolver for a node changes.
ponder.on('Registry:NewResolver', async ({ event, context }) => {
  const { node, resolver } = event.args

  await context.db.update(name, { id: node }).set(() => ({ resolver }))
})

// Logged when the owner of a node transfers ownership to a new account.
ponder.on('Registry:Transfer', async ({ event, context }) => {
  const { node, owner } = event.args

  await context.db
    .insert(name)
    .values({
      id: node,
      owner,
      createdAt: event.block.timestamp,
    })
    .onConflictDoUpdate(() => ({
      owner,
    }))
})
