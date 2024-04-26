import { createSchema } from '@ponder/core'

export default createSchema((p) => ({
  Name: p.createTable({
    id: p.hex(), // namehash
    label: p.hex().optional(), // labelhash
    owner: p.hex().optional(),
    resolver: p.hex().optional(),
  }),
}))
