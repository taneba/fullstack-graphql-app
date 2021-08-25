import { EnvelopError } from '@envelop/core'
import { GraphqlServerContext } from '../../../context'
import { TodoMapper } from '../../../modules/todo/todoMappers'
import { UserMapper } from '../../../modules/user/userMappers'
import * as gql from '../generated/graphql'

export const todoQueryResolvers: gql.QueryResolvers<GraphqlServerContext> = {
  todos: async (_, params, ctx) => {
    try {
      const result = await ctx.useCase.todo.getAll()
      return result.map(TodoMapper.toGql)
    } catch (error) {
      throw error
    }
  },
}

export const todoResolvers: gql.TodoResolvers<GraphqlServerContext> = {
  author: async (parent, params, ctx) => {
    const result = await ctx.useCase.user.findByTodoId(Number(parent.id))
    return UserMapper.toGql(result)
  },
}

export const todoMutationResolvers: gql.MutationResolvers<GraphqlServerContext> =
  {
    saveTodo: async (_, params, ctx) => {
      try {
        const result = await ctx.useCase.todo.save(params.todo)
        return TodoMapper.toGql(result)
      } catch (error) {
        throw error
      }
    },
  }
