import { match } from 'ts-pattern'
import { UserInputSchema } from 'validation-schema'

import { handleAppError } from '~/common/error'
import { whenIsErr, whenIsOk } from '~/common/result'
import { validateParams } from '~/utils/validationHelper'

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
  currentUser: async (_, params, ctx) => {
    const result = await ctx.useCase.user.findCurrentUser()
    return match(result)
      .with(whenIsErr, handleAppError)
      .with(whenIsOk, ({ value }) => UserMapper.toGql(value))
      .exhaustive()
  },
  getProfile: async (_, params, ctx) => {
    const result = await ctx.useCase.user.findCurrentUser()
    const NotFoundResponse: gql.UserNotFound = {
      __typename: 'UserNotFound',
      message: 'user not found',
      role: 'USER',
    }

    return match(result)
      .with(whenIsErr, (result) =>
        match(result)
          .with({ error: 'RESOURCE_NOT_FOUND' }, () => {
            return NotFoundResponse
          })
          .otherwise(handleAppError)
      )
      .with(whenIsOk, ({ value }) => UserMapper.toGql(value))
      .exhaustive()
  },
}

export const ProfileResult: gql.ProfileResultResolvers = {
  __resolveType(obj) {
    return match(obj)
      .with({ __typename: 'User' }, () => 'User' as const)
      .with({ __typename: 'UserNotFound' }, () => 'UserNotFound' as const)
      .otherwise(() => null)
  },
}

export const userMutationResolvers: gql.MutationResolvers<GraphqlServerContext> =
  {
    saveUser: async (_, params, ctx) => {
      validateParams(params, UserInputSchema)
      const result = await ctx.useCase.user.save(params.user)
      return match(result)
        .with(whenIsErr, handleAppError)
        .with(whenIsOk, ({ value }) => UserMapper.toGql(value))
        .exhaustive()
    },
  }
