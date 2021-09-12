import { GraphqlServerContext } from '../../../context'
import { TodoMapper } from '../../../modules/todo/todoMappers'
import { UserMapper } from '../../../modules/user/UserMapper'
import * as gql from '../generated/graphql'

export const todoQueryResolvers: gql.QueryResolvers<GraphqlServerContext> = {
  allTodos: async (_, params, ctx) => {
    const result = await ctx.useCase.todo.getAll()
    return result.map(TodoMapper.toGql)
  },
  todosByCurrentUser: async (_, params, ctx) => {
    const result = await ctx.useCase.todo.getByCurrentUser()
    return result.map(TodoMapper.toGql)
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
      const result = await ctx.useCase.todo.save(params.todo)
      return TodoMapper.toGql(result)
    },
    completeTodo: async (_, params, ctx) => {
      const result = await ctx.useCase.todo.markAsCompleted(Number(params.id))
      return TodoMapper.toGql(result)
    },
  }
