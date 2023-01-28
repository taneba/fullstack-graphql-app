import { useAuth0 } from '@envelop/auth0'
import {
  useErrorHandler,
  useExtendContext,
  useMaskedErrors,
  useSchema,
} from '@envelop/core'
import { useDepthLimit } from '@envelop/depth-limit'
import {
  ResolveUserFn,
  useGenericAuth,
  ValidateUserFn,
} from '@envelop/generic-auth'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { User } from '@prisma/client'
import { EnumValueNode, GraphQLError } from 'graphql'
import { Plugin } from 'graphql-yoga'
import { TokenExpiredError } from 'jsonwebtoken'

import { Role } from './api/graphql/generated/graphql'
import resolvers from './api/graphql/resolvers/resolvers'
import { schema } from './api/graphql/typeDefs'
import { GqlError } from './common/error'
import { createContext, GraphqlServerContext, prisma } from './context'
import { UserRepository } from './modules/user/UserRepository'
import { useOwnerCheck } from './utils/useOwnerCheck'

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolvers,
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

const validateUserFn: ValidateUserFn<User> = ({
  user,
  fieldAuthDirectiveNode,
}) => {
  if (!user) {
    throw new GqlError('request not authenticated', {
      code: 'NOT_AUTHENTICATED',
    })
  } else {
    if (!fieldAuthDirectiveNode?.arguments) {
      return
    }

    const valueNode = fieldAuthDirectiveNode.arguments.find(
      (arg) => arg.name.value === 'role'
    )?.value as EnumValueNode | undefined

    if (valueNode) {
      const role = valueNode.value as Role
      if (role !== user.role) {
        throw new GqlError('request not authorized', {
          code: 'NOT_AUTHORIZED',
        })
      }
    }
  }
}

export const envelopPlugins = [
  useSchema(executableSchema),
  useAuth0({
    domain: process.env.AUTH0_DOMAIN || '',
    audience: process.env.AUTH0_AUDIENCE || '',
    headerName: 'authorization',
    preventUnauthenticatedAccess: false,
    extendContextField: 'auth0',
    tokenType: 'Bearer',
    onError: (e) => {
      if (e instanceof TokenExpiredError) {
        throw new GqlError('jwt expired', {
          code: 'TOKEN_EXPIRED',
        })
      } else {
        console.log('error on useAuth0', e)
        throw e
      }
    },
  }),
  useGenericAuth({
    resolveUserFn: resolveUserFn,
    validateUser: validateUserFn,
    mode: 'protect-granular',
  }),
  useExtendContext(createContext), // should be after auth0 so that createContext callback can access to auth0 context
  useOwnerCheck(),
  useMaskedErrors(),
  useErrorHandler((error: unknown) => {
    console.log('ERROR: ' + JSON.stringify(error))
  }),
  useDepthLimit({
    maxDepth: 10,
  }),
]
