import { ponder } from '@/generated'

// Logged when the owner of a node transfers ownership to a new account.
ponder.on('Registry:Transfer', async ({ event, context }) => {
  const { Name } = context.db
  const { node, owner } = event.args

  await Name.upsert({
    id: node,
    create: {
      owner,
    },
    update: {
      owner,
    },
  })
})

// Logged when the owner of a node assigns a new owner to a subnode.
ponder.on('Registry:NewOwner', async ({ event, context }) => {
  const { Name } = context.db
  const { node, label, owner } = event.args

  await Name.upsert({
    id: node,
    create: {
      label,
      owner,
    },
    update: {
      owner,
    },
  })
})

// Logged when the resolver for a node changes.
ponder.on('Registry:NewResolver', async ({ event, context }) => {
  const { Name } = context.db
  const { node, resolver } = event.args

  await Name.upsert({
    id: node,
    create: {
      resolver,
    },
    update: {
      resolver,
    },
  })
})
