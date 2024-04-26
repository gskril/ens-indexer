import { ponder } from '@/generated'

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
