import { createServer } from '@graphql-yoga/node'
import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import fastifyCompress from 'fastify-compress'
import fastifyCors from 'fastify-cors'
import fastfyHelment from 'fastify-helmet'
import { Readable } from 'stream'

import { schema } from './api/graphql/typeDefs'
import { envelopPlugins } from './envelopPlugins'

const clientUrl = 'http://localhost:3000' // should be replaced with env variable

const app = fastify({ logger: true })

app.register(fastifyCors, {
  origin: clientUrl,
})
app.register(fastfyHelment, {
  contentSecurityPolicy: false,
})
app.register(fastifyCompress)

const graphQLServer = createServer<{
  req: FastifyRequest
  reply: FastifyReply
}>({
  schema: schema,
  plugins: envelopPlugins,
  logging: app.log,
  graphiql: process.env.NODE_ENV !== 'production' && {
    defaultQuery: /* GraphQL */ `
      query {
        timer # health check
      }
    `,
  },
})

app.route({
  url: '/graphql',
  method: ['GET', 'POST', 'OPTIONS'],
  handler: async (req, reply) => {
    const response = await graphQLServer.handleIncomingMessage(req, {
      req,
      reply,
    })

    for (const [name, value] of response.headers as any) {
      reply.header(name, value)
    }

    reply.status(response.status)
    const nodeStream = Readable.from(response.body!)
    reply.send(nodeStream)
  },
})

app.listen(5000, '0.0.0.0', () => {
  console.log('graphql server is running on http://localhost:5000/graphql')
})
