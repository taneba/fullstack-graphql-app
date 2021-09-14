import { useAuth0 } from '@envelop/auth0'
import {
  envelop,
  EnvelopError,
  useErrorHandler,
  useExtendContext,
  useLogger,
  useMaskedErrors,
  useSchema,
  useTiming,
} from '@envelop/core'
import { useDepthLimit } from '@envelop/depth-limit'
import {
  ResolveUserFn,
  useGenericAuth,
  ValidateUserFn,
} from '@envelop/generic-auth'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { User } from '@prisma/client'
import { EnumValueNode } from 'graphql'

import resolvers from './api/graphql/resolvers/resolvers'
import { schema } from './api/graphql/typeDefs'
import { createContext, GraphqlServerContext, prisma } from './context'
import { UserRepository } from './modules/user/UserRepository'

const executableSchema = makeExecutableSchema({
  resolvers: resolvers,
  typeDefs: schema,
})

const resolveUserFn: ResolveUserFn<User, GraphqlServerContext> = async (
  context
) => {
  try {
    const uid = context.auth0?.sub
    if (!uid) {
      throw new Error('not authenticated')
    }
    const userRepository = new UserRepository(prisma)
    const user = await userRepository.findByUid(uid)
    return user
  } catch (e) {
    console.error('Failed to get user', e)

    return null
  }
}

const validateUserFn: ValidateUserFn<User, GraphqlServerContext> = async (
  user,
  _context,
  _ctx,
  directiveNode
) => {
  if (!user) {
    throw new EnvelopError('request not authenticated', {
      code: 'NOT_AUTHENTICATED',
    })
  }
  if (!directiveNode?.arguments) {
    return
  }

  const valueNode = directiveNode.arguments.find(
    (arg) => arg.name.value === 'role'
  )?.value as EnumValueNode | undefined

  if (valueNode) {
    const role = valueNode.value
    if (role !== user.role) {
      throw new EnvelopError('request not authorized', {
        code: 'NOT_AUTHORIZED',
      })
    }
  }
}

export const getEnveloped = envelop({
  plugins: [
    useSchema(executableSchema),
    useLogger(),
    useAuth0({
      domain: process.env.AUTH0_DOMAIN || '',
      audience: process.env.AUTH0_AUDIENCE || '',
      headerName: 'authorization',
      preventUnauthenticatedAccess: false,
      extendContextField: 'auth0',
      tokenType: 'Bearer',
    }),
    useGenericAuth({
      resolveUserFn: resolveUserFn,
      validateUser: validateUserFn,
      mode: 'protect-auth-directive',
    }),
    useExtendContext(createContext), // should be after auth0 so that createContext callback can access to auth0 context
    useMaskedErrors(),
    useErrorHandler((error: unknown) => {
      console.log('ERROR: ' + JSON.stringify(error))
    }),
    useTiming(),
    useDepthLimit({
      maxDepth: 10,
    }),
  ],
})
