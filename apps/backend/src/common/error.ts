import { GraphQLError } from 'graphql'
import { match } from 'ts-pattern'

import { err } from './result'

export const AppError = {
  database: 'DATABASE',
  validation: 'VALIDATION',
  resourceNotFound: 'RESOURCE_NOT_FOUND',
  auth0: 'AUTH0',
  userNotFound: 'USER_NOT_FOUND',
} as const

export type AppErrorType = typeof AppError[keyof typeof AppError]

export const handleAppError = (result: ReturnType<typeof err>) =>
  match(result)
    .with({ error: 'DATABASE' }, () => {
      throw new GraphQLError('database error')
    })
    .with({ error: 'RESOURCE_NOT_FOUND' }, () => {
      throw new GraphQLError('resource not found error')
    })

    .with({ error: 'AUTH0' }, () => {
      throw new GraphQLError('auth0 error')
    })
    .with({ error: 'VALIDATION' }, () => {
      throw new GraphQLError('validation error')
    })
    .with({ error: 'USER_NOT_FOUND' }, () => {
      throw new GraphQLError('user not found error')
    })
    .exhaustive()

export class GqlError extends GraphQLError {
  constructor(message: string, extensions?: Record<string, any>) {
    super(
      message,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      extensions
    )
  }
}
