import { EnvelopError } from '@envelop/core'

import { GraphqlServerContext } from '../../../context'
import { TodoMapper } from '../../../modules/todo/todoMappers'
import { UserMapper } from '../../../modules/user/UserMapper'
import * as gql from '../generated/graphql'

export const todoQueryResolvers: gql.QueryResolvers<GraphqlServerContext> = {
  allTodos: async (_, params, ctx) => {
    const result = await ctx.useCase.todo.findAll()
    if (result.isErr()) {
      throw new EnvelopError(result.error.message)
    }
    return TodoMapper.toGqlCollection(result.value)
  },
  todosByCurrentUser: async (_, params, ctx) => {
    const result = await ctx.useCase.todo.findByCurrentUser()
    if (result.isErr()) {
      throw new EnvelopError(result.error.message)
    }
    return TodoMapper.toGqlCollection(result.value)
  },
}

export const todoResolvers: gql.TodoResolvers<GraphqlServerContext> = {
  author: async (parent, params, ctx) => {
    const result = await ctx.useCase.user.findByTodoId(Number(parent.id))
    if (result.isErr()) {
      throw new EnvelopError(result.error.message)
    }
    return UserMapper.toGql(result.value)
  },
}

export const todoMutationResolvers: gql.MutationResolvers<GraphqlServerContext> =
  {
    saveTodo: async (_, params, ctx) => {
      const result = await ctx.useCase.todo.save(params.todo)
      if (result.isErr()) {
        throw new EnvelopError(result.error.message)
      }
      return TodoMapper.toGql(result.value)
    },
    completeTodo: async (_, params, ctx) => {
      const result = await ctx.useCase.todo.markAsCompleted(Number(params.id))
      return TodoMapper.toGql(result.value)
    },
  }
