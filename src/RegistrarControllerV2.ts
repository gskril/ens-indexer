import { ponder } from 'ponder:registry'

import { name } from '../ponder.schema'
import { getEth2LdNodeFromLabelhash } from './utils'

ponder.on(
  'RegistrarControllerV2:NameRegistered',
  async ({ event, context }) => {
    const { name: label, label: labelhash } = event.args
    const node = getEth2LdNodeFromLabelhash(labelhash)

    // We can ignore the `owner` and `expires` fields since they are already tracked by the BaseRegistrar
    await context.db
      .update(name, { id: node })
      .set(() => ({ name: `${label}.eth`, label }))
  }
)

ponder.on('RegistrarControllerV2:NameRenewed', async () => {
  // We don't need to do anything here since expiration is already tracked by the BaseRegistrar
})
