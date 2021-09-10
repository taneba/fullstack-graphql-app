import { GraphqlServerContext } from '../../../context'
import { UserMapper } from '../../../modules/user/UserMapper'
import * as gql from '../generated/graphql'

export const userQueryResolvers: gql.QueryResolvers<GraphqlServerContext> = {
  allUsers: async (_, params, ctx) => {
    try {
      const result = await ctx.useCase.user.getAll()
      return result.map(UserMapper.toGql)
    } catch (error) {
      throw error
    }
  },
}

export const userMutationResolvers: gql.MutationResolvers<GraphqlServerContext> =
  {
    saveUser: async (_, params, ctx) => {
      try {
        const result = await ctx.useCase.user.save(params.user)
        return UserMapper.toGql(result)
      } catch (error) {
        throw error
      }
    },
  }
