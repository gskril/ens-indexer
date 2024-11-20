import { onchainTable, relations } from '@ponder/core'

export const name = onchainTable('name', (t) => ({
  id: t.hex().primaryKey(), // namehash
  parentId: t.hex(),
  labelhash: t.hex(),
  label: t.text(),
  name: t.text(),
  owner: t.hex(),
  wrappedOwner: t.hex(),
  fuses: t.integer(),
  resolver: t.hex(),
  expiresAt: t.bigint(),
  createdAt: t.bigint().notNull(),
}))

export const nameRelations = relations(name, ({ one }) => ({
  parent: one(name, {
    fields: [name.id],
    references: [name.parentId],
  }),
}))
