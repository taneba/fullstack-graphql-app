import fastify from 'fastify'
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  shouldRenderGraphiQL,
} from 'graphql-helix'
import {
  envelop,
  useLogger,
  useTiming,
  useExtendContext,
  useSchema,
  useErrorHandler,
} from '@envelop/core'
import { useDepthLimit } from '@envelop/depth-limit'
import { schema } from './api/graphql/typeDefs'
import { makeExecutableSchema } from '@graphql-tools/schema'
import resolvers from './api/graphql/resolvers/resolvers'
import { createContext } from './context'
const app = fastify()

const executableSchema = makeExecutableSchema({
  resolvers: resolvers,
  typeDefs: schema,
})

const getEnveloped = envelop({
  plugins: [
    useSchema(executableSchema),
    useExtendContext(createContext),
    // Logs parameters and information about the execution phases. You can easily plug in your custom logger.
    useLogger(),
    useErrorHandler((error) => {
      // This callback is called per each GraphQLError emitted during execution phase
      console.log('ERROR', JSON.stringify(error))
    }),
    /** t's a simple time metric collection for every phase in your execution.
     * You can easily customize the behavior of each timing measurement.
     * By default, the timing is printed to the log, using console.log. */
    useTiming(),
    useDepthLimit({
      maxDepth: 10,
    }),
  ],
})
app.register(require('fastify-cors'))

app.route({
  method: ['GET', 'POST'],
  url: '/graphql',
  handler: async (req, res) => {
    const { parse, validate, contextFactory, execute, schema } = getEnveloped({
      req,
    })

    const request = {
      body: req.body,
      headers: req.headers,
      method: req.method,
      query: req.query,
    }

    if (
      shouldRenderGraphiQL(request) &&
      process.env.NODE_ENV !== 'production'
    ) {
      console.log('render graphqiql')
      res.type('text/html')
      res.send(renderGraphiQL())
    } else {
      const { operationName, query, variables } = getGraphQLParameters(request)

      const result = await processRequest({
        operationName,
        query,
        variables,
        parse,
        validate,
        execute,
        request,
        schema,
        contextFactory,
      })

      if (result.type === 'RESPONSE') {
        res.status(result.status)
        res.send(result.payload)
      } else if (result.type === 'MULTIPART_RESPONSE') {
        res.raw.writeHead(200, {
          Connection: 'keep-alive',
          'Content-Type': 'multipart/mixed; boundary="-"',
          'Transfer-Encoding': 'chunked',
        })

        req.raw.on('close', () => {
          result.unsubscribe()
        })

        res.raw.write('---')

        await result.subscribe((result) => {
          const chunk = Buffer.from(JSON.stringify(result), 'utf8')
          const data = [
            '',
            'Content-Type: application/json; charset=utf-8',
            'Content-Length: ' + String(chunk.length),
            '',
            chunk,
          ]

          if (result.hasNext) {
            data.push('---')
          }

          res.raw.write(data.join('\r\n'))
        })

        res.raw.write('\r\n-----\r\n')
        res.raw.end()
      } else {
        res.raw.writeHead(200, {
          'Content-Type': 'text/event-stream',
          Connection: 'keep-alive',
          'Cache-Control': 'no-cache',
        })

        req.raw.on('close', () => {
          result.unsubscribe()
        })

        await result.subscribe((result) => {
          res.raw.write(`data: ${JSON.stringify(result)}\n\n`)
        })
      }
    }
  },
})

app.listen(5000, '0.0.0.0', () => {
  console.log('graphql server is running on http://localhost:5000/graphql')
})
