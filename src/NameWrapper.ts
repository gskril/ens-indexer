import { ponder } from 'ponder:registry'
import { labelhash, toBytes, toHex } from 'viem'

import { name } from '../ponder.schema'
import { bytesToPacket } from './utils'

// Fires before `NameWrapped`
ponder.on('NameWrapper:TransferSingle', async ({ event, context }) => {
  const { to, id } = event.args
  const node = toHex(id, { size: 32 })

  await context.db.update(name, { id: node }).set(() => ({ wrappedOwner: to }))
})

ponder.on('NameWrapper:TransferBatch', async ({ event, context }) => {
  const { to, ids } = event.args
  const nodes = ids.map((id) => toHex(id, { size: 32 }))

  // TODO: Optimize this
  // https://orm.drizzle.team/docs/guides/update-many-with-different-value
  for (const node of nodes) {
    await context.db
      .update(name, { id: node })
      .set(() => ({ wrappedOwner: to }))
  }
})

ponder.on('NameWrapper:NameWrapped', async ({ event, context }) => {
  const { node, name: encodedName, owner, fuses, expiry } = event.args

  const decodedName = bytesToPacket(toBytes(encodedName))
  const label = decodedName.split('.')[0]!

  await context.db.update(name, { id: node }).set(() => ({
    name: decodedName,
    label,
    labelhash: labelhash(label),
    owner: event.log.address,
    wrappedOwner: owner,
    fuses,
    expiresAt: expiry,
  }))
})

ponder.on('NameWrapper:NameUnwrapped', async ({ event, context }) => {
  const { node } = event.args

  // We can ignore `owner` becuase it will be taken care of by the Registry
  await context.db
    .update(name, { id: node })
    .set(() => ({ wrappedOwner: null }))
})

ponder.on('NameWrapper:ExpiryExtended', async ({ event, context }) => {
  const { node, expiry } = event.args

  await context.db.update(name, { id: node }).set(() => ({ expiresAt: expiry }))
})

ponder.on('NameWrapper:FusesSet', async ({ event, context }) => {
  const { node, fuses } = event.args

  await context.db.update(name, { id: node }).set(() => ({ fuses }))
})
