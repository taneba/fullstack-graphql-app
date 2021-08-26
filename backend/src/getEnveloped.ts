// import {
//   getGraphQLParameters,
//   processRequest,
//   shouldRenderGraphiQL,
// } from 'graphql-helix'
import {
  envelop,
  useLogger,
  useTiming,
  useExtendContext,
  useSchema,
  useErrorHandler,
  useMaskedErrors,
  EnvelopError,
} from '@envelop/core'

import { useDepthLimit } from '@envelop/depth-limit'
import { schema } from './api/graphql/typeDefs'
import { makeExecutableSchema } from '@graphql-tools/schema'
import {
  useGenericAuth,
  ResolveUserFn,
  ValidateUserFn,
} from '@envelop/generic-auth'
import resolvers from './api/graphql/resolvers/resolvers'
import { createContext, GraphqlServerContext } from './context'
import { useAuth0 } from '@envelop/auth0'
import { User } from '@prisma/client'

const executableSchema = makeExecutableSchema({
  resolvers: resolvers,
  typeDefs: schema,
})

const resolveUserFn: ResolveUserFn<User, GraphqlServerContext> = async (
  context
) => {
  try {
    const user = await context.useCase.user.findByUid()
    return user
  } catch (e) {
    console.error('Failed to get user')

    return null
  }
}

const validateUser: ValidateUserFn<User, GraphqlServerContext> = async (
  user
) => {
  if (!user) {
    throw new EnvelopError('request not authenticated', {
      code: 'NOT_AUTHENTICATED',
    })
  }
}

export const getEnveloped = envelop({
  plugins: [
    useSchema(executableSchema),
    useLogger(),
    useAuth0({
      //   onError: (e: any) => {
      //     throw new EnvelopError('request not authenticated', {
      //       code: 'NOT_AUTHENTICATED',
      //     })
      // NOTE: this does not work because of the graphql-helix issues
      // see https://github.com/dotansimha/envelop/issues/606
      // we are using internal graphql-helix pkg as workaround for now
      //   },
      domain: process.env.AUTH0_DOMAIN!,
      audience: process.env.AUTH0_AUDIENCE!,
      headerName: 'authorization',
      preventUnauthenticatedAccess: false,
      extendContextField: 'auth0',
      tokenType: 'Bearer',
    }),
    useGenericAuth({
      resolveUserFn,
      validateUser,
      mode: 'protect-auth-directive',
    }),
    useExtendContext(createContext), // should be after auth0 so that createContext callback can access to auth0 context
    useMaskedErrors(),
    useErrorHandler((error: any) => {
      console.log('ERROR: ' + JSON.stringify(error))
    }),
    useTiming(),
    useDepthLimit({
      maxDepth: 10,
    }),
  ],
})
