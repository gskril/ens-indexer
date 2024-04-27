import { ponder } from '@/generated'
import { labelhash, toHex } from 'viem'

// Fires before `NameWrapped`
ponder.on('NameWrapper:TransferSingle', async ({ event, context }) => {
  const { Name } = context.db
  const { to, id } = event.args

  await Name.update({
    id: toHex(id),
    data: {
      wrappedOwner: to,
    },
  })
})

ponder.on('NameWrapper:TransferBatch', async ({ event, context }) => {
  const { Name } = context.db
  const { to, ids } = event.args

  await Name.updateMany({
    where: {
      id: { in: ids.map((id) => toHex(id)) },
    },
    data: {
      wrappedOwner: to,
    },
  })
})

ponder.on('NameWrapper:NameWrapped', async ({ event, context }) => {
  const { Name } = context.db
  const { node, name: encodedName, owner, fuses, expiry } = event.args

  const name = Buffer.from(encodedName.slice(2), 'hex')
    .toString('utf8')
    .replace(/[\x01-\x20]/g, '.')
    .replace(/\0/g, '')
    .slice(1)

  const label = name.split('.')[0]!

  await Name.update({
    id: node,
    data: {
      name,
      label,
      labelhash: labelhash(label),
      wrappedOwner: owner,
      fuses,
      expiresAt: expiry,
    },
  })
})

ponder.on('NameWrapper:NameUnwrapped', async ({ event, context }) => {
  const { Name } = context.db
  const { node } = event.args

  // We can ignore `owner` becuase it will be taken care of by the Registry
  await Name.update({
    id: node,
    data: {
      wrappedOwner: undefined,
    },
  })
})

ponder.on('NameWrapper:ExpiryExtended', async ({ event, context }) => {
  const { Name } = context.db
  const { node, expiry } = event.args

  await Name.update({
    id: node,
    data: {
      expiresAt: expiry,
    },
  })
})

ponder.on('NameWrapper:FusesSet', async ({ event, context }) => {
  const { Name } = context.db
  const { node, fuses } = event.args

  await Name.update({
    id: node,
    data: {
      fuses,
    },
  })
})
