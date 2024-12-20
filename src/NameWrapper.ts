import { ponder } from '@/generated'
import { labelhash, toHex } from 'viem'

import { name } from '../ponder.schema'

// Fires before `NameWrapped`
ponder.on('NameWrapper:TransferSingle', async ({ event, context }) => {
  const { to, id } = event.args

  await context.db
    .update(name, { id: toHex(id) })
    .set(() => ({ wrappedOwner: to }))
})

ponder.on('NameWrapper:TransferBatch', async ({ event, context }) => {
  const { to, ids } = event.args

  // TODO: Optimize this
  // https://orm.drizzle.team/docs/guides/update-many-with-different-value
  for (const id of ids) {
    await context.db
      .update(name, { id: toHex(id) })
      .set(() => ({ wrappedOwner: to }))
  }
})

ponder.on('NameWrapper:NameWrapped', async ({ event, context }) => {
  const { node, name: encodedName, owner, fuses, expiry } = event.args

  const decodedName = Buffer.from(encodedName.slice(2), 'hex')
    .toString('utf8')
    .replace(/[\x01-\x20]/g, '.')
    .replace(/\0/g, '')
    .slice(1)

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
    .set(() => ({ wrappedOwner: undefined }))
})

ponder.on('NameWrapper:ExpiryExtended', async ({ event, context }) => {
  const { node, expiry } = event.args

  await context.db.update(name, { id: node }).set(() => ({ expiresAt: expiry }))
})

ponder.on('NameWrapper:FusesSet', async ({ event, context }) => {
  const { node, fuses } = event.args

  await context.db.update(name, { id: node }).set(() => ({ fuses }))
})
