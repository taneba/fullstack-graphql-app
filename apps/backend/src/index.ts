import fastifyCompress from '@fastify/compress'
import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import { renderGraphiQL } from '@graphql-yoga/render-graphiql'
import fastify, { FastifyReply, FastifyRequest } from 'fastify'
// import { createServer } from '@graphql-yoga/node'
import { createYoga } from 'graphql-yoga'

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

// const graphQLServer = createServer<{
//   req: FastifyRequest
//   reply: FastifyReply
// }>({
//   schema: schema,
//   plugins: envelopPlugins,
//   logging: app.log,
//   renderGraphiQL:
// process.env.NODE_ENV !== 'production'
//   ? () =>
//       renderGraphiQL({
//         defaultQuery: /* GraphQL */ `
//           query {
//             time # health check
//           }
//         `,
//       })
//   : undefined,
// })

const yoga = createYoga<{
  req: FastifyRequest
  reply: FastifyReply
}>({
  plugins: envelopPlugins,
  // Integrate Fastify logger
  logging: {
    debug: (...args) => args.forEach((arg) => app.log.debug(arg)),
    info: (...args) => args.forEach((arg) => app.log.info(arg)),
    warn: (...args) => args.forEach((arg) => app.log.warn(arg)),
    error: (...args) => args.forEach((arg) => app.log.error(arg)),
  },
  graphiql:
    process.env.NODE_ENV !== 'production'
      ? {
          defaultQuery: /* GraphQL */ `
            query {
              time # health check
            }
          `,
        }
      : false,
})

app.route({
  url: '/graphql',
  method: ['GET', 'POST', 'OPTIONS'],
  handler: async (req, reply) => {
    // Second parameter adds Fastify's `req` and `reply` to the GraphQL Context
    const response = await yoga.handleNodeRequest(req, {
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
        port: 5001,
        host: '0.0.0.0',
      },
      () => {
        console.log(
          'graphql server is running on http://localhost:5001/graphql'
        )
      }
    )
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
