import { EnvelopError } from '@envelop/core'
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
      throw new EnvelopError('database error')
    })
    .with({ error: 'RESOURCE_NOT_FOUND' }, () => {
      throw new EnvelopError('resource not found error')
    })

    .with({ error: 'AUTH0' }, () => {
      throw new EnvelopError('auth0 error')
    })
    .with({ error: 'VALIDATION' }, () => {
      throw new EnvelopError('validation error')
    })
    .with({ error: 'USER_NOT_FOUND' }, () => {
      throw new EnvelopError('user not found error')
    })
    .exhaustive()
