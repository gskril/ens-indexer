import { createSchema } from '@ponder/core'

export default createSchema((p) => ({
  Name: p.createTable({
    id: p.hex(), // namehash
    parentId: p.hex().references('Name.id').optional(),
    parent: p.one('parentId'),
    labelhash: p.hex().optional(),
    label: p.string().optional(),
    name: p.string().optional(),
    owner: p.hex().optional(),
    wrappedOwner: p.hex().optional(),
    fuses: p.int().optional(),
    resolver: p.hex().optional(),
    expiresAt: p.bigint().optional(),
    createdAt: p.bigint(),
  }),
}))
