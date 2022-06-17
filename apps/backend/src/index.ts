import fastifyCompress from '@fastify/compress'
import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import { createServer } from '@graphql-yoga/node'
import { renderGraphiQL } from '@graphql-yoga/render-graphiql'
import fastify, { FastifyReply, FastifyRequest } from 'fastify'

import { schema } from './api/graphql/typeDefs'
import { envelopPlugins } from './envelopPlugins'

const clientUrl = 'http://localhost:3000' // should be replaced with env variable

const app = fastify({ logger: true })

app.register(fastifyCors, {
  origin: clientUrl,
})
app.register(fastifyHelmet, {
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
  renderGraphiQL:
    process.env.NODE_ENV !== 'production'
      ? () =>
          renderGraphiQL({
            defaultQuery: /* GraphQL */ `
              query {
                time # health check
              }
            `,
          })
      : undefined,
})

app.route({
  url: '/graphql',
  method: ['GET', 'POST', 'OPTIONS'],
  handler: async (req, reply) => {
    const response = await graphQLServer.handleIncomingMessage(req, {
      req,
      reply,
    })

    response.headers.forEach((value, key) => {
      reply.header(key, value)
    })

    reply.status(response.status)
    reply.send(response.body)

    return reply
  },
})

const start = async () => {
  try {
    app.listen(
      {
        port: 5000,
        host: '0.0.0.0',
      },
      () => {
        console.log(
          'graphql server is running on http://localhost:5000/graphql'
        )
      }
    )
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
