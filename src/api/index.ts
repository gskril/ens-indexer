import { graphql } from '@ponder/core'
import { Hex } from 'viem'
import { ponder } from '@/generated'

ponder.use('/', graphql())

ponder.get('/name/:name', async (c) => {
  const _name = c.req.param('name')
  const res = await c.db.query.name.findFirst({
    where: (name, { eq }) => eq(name.name, _name),
    with: { parent: true },
  })

  if (!res) {
    return c.json({ error: 'Name not found' }, 404)
  }

  return c.json(res)
})

ponder.get('/node/:node', async (c) => {
  const node = c.req.param('node') as Hex
  const res = await c.db.query.name.findFirst({
    where: (name, { eq }) => eq(name.id, node),
    with: { parent: true },
  })

  if (!res) {
    return c.json({ error: 'Name not found' }, 404)
  }

  return c.json(res)
})
