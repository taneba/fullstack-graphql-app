import { GraphqlServerContext } from '../../../context'
import { UserMapper } from '../../../modules/user/UserMapper'
import * as gql from '../generated/graphql'

export const userQueryResolvers: gql.QueryResolvers<GraphqlServerContext> = {
  allUsers: async (_, params, ctx) => {
    const result = await ctx.useCase.user.getAll()
    return UserMapper.toGqlCollection(result)
  },
}

export const userMutationResolvers: gql.MutationResolvers<GraphqlServerContext> =
  {
    saveUser: async (_, params, ctx) => {
      const result = await ctx.useCase.user.save(params.user)
      return UserMapper.toGql(result)
    },
  }
