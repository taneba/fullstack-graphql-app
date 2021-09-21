import { EnvelopError } from '@envelop/core'
import { match, select } from 'ts-pattern'

import { GraphqlServerContext } from '../../../context'
import { TodoMapper } from '../../../modules/todo/todoMappers'
import { UserMapper } from '../../../modules/user/UserMapper'
import * as gql from '../generated/graphql'

export const todoQueryResolvers: gql.QueryResolvers<GraphqlServerContext> = {
  allTodos: async (_, params, ctx) => {
    const result = await ctx.useCase.todo.findAll()
    return TodoMapper.toGqlCollection(result)
  },
  todosByCurrentUser: async (_, params, ctx) => {
    const result = await ctx.useCase.todo.findByCurrentUser()
    // Just an example for ts-pattern
    return match(result)
      .with({ type: 'error', error: 'DATABASE' }, (res) => {
        throw new EnvelopError('database error')
      })
      .with({ type: 'error', error: 'RESOURCE_NOT_FOUND' }, (res) => {
        throw new EnvelopError('resource not founr error')
      })
      .with({ type: 'ok' }, (res) => {
        const result = res.data
        return TodoMapper.toGqlCollection(result)
      })
      .exhaustive()
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
