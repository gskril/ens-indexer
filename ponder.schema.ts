import { createSchema } from '@ponder/core'

export default createSchema((p) => ({
  Name: p.createTable({
    id: p.hex(), // namehash
    labelhash: p.hex().optional(),
    label: p.string().optional(),
    name: p.string().optional(),
    owner: p.hex().optional(),
    wrappedOwner: p.hex().optional(),
    resolver: p.hex().optional(),
    expiresAt: p.bigint().optional(),
    createdAt: p.bigint(),
  }),
}))
