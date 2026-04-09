import { db } from 'ponder:api'
import schema from 'ponder:schema'
import { Hono } from 'hono'
import { graphql, replaceBigInts } from 'ponder'
import { Hex } from 'viem'

const app = new Hono()

app.use('/', graphql({ db, schema }))
app.use('/graphql', graphql({ db, schema }))

app.get('/name/:name', async (c) => {
  const _name = c.req.param('name')
  const res = await db.query.name.findFirst({
    where: (name, { eq }) => eq(name.name, _name),
    with: { parent: true },
  })

  if (!res) {
    return c.json({ error: 'Name not found' }, 404)
  }

  return c.json(replaceBigInts(res, (v) => String(v)))
})

app.get('/node/:node', async (c) => {
  const node = c.req.param('node') as Hex
  const res = await db.query.name.findFirst({
    where: (name, { eq }) => eq(name.id, node),
    with: { parent: true },
  })

  if (!res) {
    return c.json({ error: 'Name not found' }, 404)
  }

  return c.json(replaceBigInts(res, (v) => String(v)))
})

export default app
