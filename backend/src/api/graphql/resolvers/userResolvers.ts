import { EnvelopError } from '@envelop/core'
import { match } from 'ts-pattern'

import { GraphqlServerContext } from '../../../context'
import { UserMapper } from '../../../modules/user/UserMapper'
import * as gql from '../generated/graphql'

export const userQueryResolvers: gql.QueryResolvers<GraphqlServerContext> = {
  allUsers: async (_, params, ctx) => {
    const result = await ctx.useCase.user.findAll()
    return UserMapper.toGqlCollection(result)
  },
}

export const userMutationResolvers: gql.MutationResolvers<GraphqlServerContext> =
  {
    saveUser: async (_, params, ctx) => {
      const result = await ctx.useCase.user.save(params.user)
      return match(result)
        .with({ type: 'error', error: 'DATABASE' }, (res) => {
          throw new EnvelopError('database error')
        })
        .with({ type: 'error', error: 'AUTH0' }, (res) => {
          throw new EnvelopError('auth0 error')
        })
        .with({ type: 'ok' }, (res) => {
          const result = res.data
          return UserMapper.toGql(result)
        })
        .exhaustive()
    },
  }
