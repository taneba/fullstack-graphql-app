import fastify from 'fastify'
import fastifyCompress from 'fastify-compress'
import fastifyCors from 'fastify-cors'
import fastfyHelment from 'fastify-helmet'
import { renderPlaygroundPage } from 'graphql-playground-html'

import { getEnveloped } from './getEnveloped'
import {
  getGraphQLParameters,
  processRequest,
  shouldRenderGraphiQL,
} from './lib/graphql-helix'

const app = fastify()

app.register(fastifyCors)
app.register(fastfyHelment, {
  contentSecurityPolicy: false,
})
app.register(fastifyCompress)

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
      // We use playground until it's implemented in GraphiQL as a preset. see https://github.com/graphql/graphiql/issues/1443
      res.send(renderPlaygroundPage({}))
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
        contextFactory: () => contextFactory({ req }),
      })

      if (result.type === 'RESPONSE') {
        console.log(result)
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
