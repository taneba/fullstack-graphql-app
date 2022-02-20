import { match } from 'ts-pattern'

import { handleAppError } from '~/common/error'
import { whenIsErr, whenIsOk } from '~/common/result'

import { GraphqlServerContext } from '../../../context'
import { TodoMapper } from '../../../modules/todo/todoMappers'
import { UserMapper } from '../../../modules/user/UserMapper'
import * as gql from '../generated/graphql'

export const todoQueryResolvers: gql.QueryResolvers<GraphqlServerContext> = {
  allTodos: async (_, params, ctx) => {
    const result = await ctx.useCase.todo.findAll()
    return match(result)
      .with(whenIsErr, handleAppError)
      .with(whenIsOk, ({ value }) => TodoMapper.toGqlCollection(value))
      .exhaustive()
  },
  todosByCurrentUser: async (_, params, ctx) => {
    const result = await ctx.useCase.todo.findByCurrentUser()
    return match(result)
      .with(whenIsErr, handleAppError)
      .with(whenIsOk, ({ value }) => TodoMapper.toGqlCollection(value))
      .exhaustive()
  },
  todo: async (_, params, ctx) => {
    const result = await ctx.useCase.todo.findById(Number(params.id))
    return match(result)
      .with(whenIsErr, handleAppError)
      .with(whenIsOk, ({ value }) => TodoMapper.toGql(value))
      .exhaustive()
  },
}

export const todoResolvers: gql.TodoResolvers<GraphqlServerContext> = {
  author: async (parent, params, ctx) => {
    const result = await ctx.useCase.user.findByTodoId(Number(parent.id))
    return match(result)
      .with(whenIsErr, handleAppError)
      .with(whenIsOk, ({ value }) => UserMapper.toGql(value))
      .exhaustive()
  },
}

export const todoMutationResolvers: gql.MutationResolvers<GraphqlServerContext> =
  {
    saveTodo: async (_, params, ctx) => {
      const result = await ctx.useCase.todo.save(params.todo)
      return match(result)
        .with(whenIsErr, handleAppError)
        .with(whenIsOk, ({ value }) => {
          return TodoMapper.toGql(value)
        })
        .exhaustive()
    },
    completeTodo: async (_, params, ctx) => {
      const result = await ctx.useCase.todo.markAsCompleted(Number(params.id))
      return match(result)
        .with(whenIsErr, handleAppError)
        .with(whenIsOk, ({ value }) => TodoMapper.toGql(value))
        .exhaustive()
    },
  }
