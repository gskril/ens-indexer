import { ponder } from '@/generated'
import { getNodeFromParentNodeAndLabelhash } from './utils'

// Logged when the owner of a node assigns a new owner to a subnode.
// This is the first record of a 3LD+ onchain.
ponder.on('Registry:NewOwner', async ({ event, context }) => {
  const { Name } = context.db
  const { node: parentNode, label: labelhash, owner } = event.args

  const node = getNodeFromParentNodeAndLabelhash(parentNode, labelhash)

  await Name.upsert({
    id: node,
    create: {
      parentId: parentNode,
      labelhash,
      owner,
      createdAt: event.block.timestamp,
    },
    update: {
      labelhash,
      owner,
    },
  })
})

// Logged when the resolver for a node changes.
ponder.on('Registry:NewResolver', async ({ event, context }) => {
  const { Name } = context.db
  const { node, resolver } = event.args

  await Name.update({
    id: node,
    data: {
      resolver,
    },
  })
})

// Logged when the owner of a node transfers ownership to a new account.
ponder.on('Registry:Transfer', async ({ event, context }) => {
  const { Name } = context.db
  const { node, owner } = event.args

  await Name.upsert({
    id: node,
    create: {
      owner,
      createdAt: event.block.timestamp,
    },
    update: {
      owner,
    },
  })
})
