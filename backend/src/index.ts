import fastify from 'fastify'
import fastifyCompress from 'fastify-compress'
import fastifyCors from 'fastify-cors'
import fastfyHelment from 'fastify-helmet'
import {
  getGraphQLParameters,
  processRequest,
  sendResult,
  shouldRenderGraphiQL,
} from 'graphql-helix'
import { renderPlaygroundPage } from 'graphql-playground-html'

import { getEnveloped } from './getEnveloped'

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
      sendResult(result, res.raw)
    }
  },
})

app.listen(5000, '0.0.0.0', () => {
  console.log('graphql server is running on http://localhost:5000/graphql')
})
