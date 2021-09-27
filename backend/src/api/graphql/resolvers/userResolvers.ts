import { match } from 'ts-pattern'

import { handleAppError } from '~/common/error'
import { whenIsErr, whenIsOk } from '~/common/result'

import { GraphqlServerContext } from '../../../context'
import { UserMapper } from '../../../modules/user/UserMapper'
import * as gql from '../generated/graphql'

export const userQueryResolvers: gql.QueryResolvers<GraphqlServerContext> = {
  allUsers: async (_, params, ctx) => {
    const result = await ctx.useCase.user.findAll()
    return match(result)
      .with(whenIsErr, handleAppError)
      .with(whenIsOk, ({ value }) => UserMapper.toGqlCollection(value))
      .exhaustive()
  },
}

export const userMutationResolvers: gql.MutationResolvers<GraphqlServerContext> =
  {
    saveUser: async (_, params, ctx) => {
      const result = await ctx.useCase.user.save(params.user)
      return match(result)
        .with(whenIsErr, handleAppError)
        .with(whenIsOk, ({ value }) => UserMapper.toGql(value))
        .exhaustive()
    },
  }
