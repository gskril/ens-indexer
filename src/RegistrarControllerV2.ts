import { ponder } from '@/generated'
import { namehash } from 'viem'

import { name } from '../ponder.schema'

ponder.on(
  'RegistrarControllerV2:NameRegistered',
  async ({ event, context }) => {
    const { name: label } = event.args

    const nameWithTld = `${label}.eth`
    const node = namehash(nameWithTld)

    // We can ignore the `owner` and `expires` fields since they are already tracked by the BaseRegistrar
    await context.db
      .update(name, { id: node })
      .set(() => ({ name: nameWithTld, label }))
  }
)

ponder.on('RegistrarControllerV2:NameRenewed', async () => {
  // We don't need to do anything here since expiration is already tracked by the BaseRegistrar
})
