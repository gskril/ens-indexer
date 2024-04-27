import { ponder } from '@/generated'
import { namehash } from 'viem'

// prettier-ignore
ponder.on('RegistrarControllerV2:NameRegistered', async ({ event, context }) => {
    const { Name } = context.db
    const { name: label } = event.args

    const name = `${label}.eth`
    const node = namehash(name)

    // We can ignore the `owner` and `expires` fields since they are already tracked by the BaseRegistrar
    await Name.update({
      id: node,
      data: {
        name,
        label,
      },
    })
  }
)

ponder.on('RegistrarControllerV2:NameRenewed', async () => {
  // We don't need to do anything here since expiration is already tracked by the BaseRegistrar
})
