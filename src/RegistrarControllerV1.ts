import { ponder } from 'ponder:registry'
import { namehash } from 'viem'

import { name } from '../ponder.schema'
import { getNodeFromParentNodeAndLabelhash } from './utils'

ponder.on(
  'RegistrarControllerV1:NameRegistered',
  async ({ event, context }) => {
    const { name: label, label: labelhash } = event.args

    const parentNode = namehash('eth')
    const node = getNodeFromParentNodeAndLabelhash(parentNode, labelhash)

    // We can ignore the `owner` and `expires` fields since they are already tracked by the BaseRegistrar
    await context.db.update(name, { id: node }).set(() => ({
      name: `${label}.eth`,
      label,
    }))
  }
)

ponder.on('RegistrarControllerV1:NameRenewed', async () => {
  // We don't need to do anything here since expiration is already tracked by the BaseRegistrar
})
