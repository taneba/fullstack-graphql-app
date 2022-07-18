import { EnvelopError } from '@envelop/core'
import { match, P } from 'ts-pattern'

import { AppErrorType } from './error'

type Ok<T> = Readonly<{ type: 'ok'; value: T }>

type Err<E> = Readonly<{ type: 'error'; error: E }>

export type Result<T, E extends AppErrorType> = Ok<T> | Err<E>

export const ok = <T>(value: T): Ok<T> => ({
  type: 'ok',
  value: value,
})

export const err = <E extends AppErrorType>(error: E): Err<E> => ({
  type: 'error',
  error: error,
})

export const matchResult = <T extends Result<any, AppErrorType>>(result: T) =>
  match(result).with<P.Pattern<any>, unknown, any>(
    { type: 'error', error: 'DATABASE' },
    () => {
      throw new EnvelopError('database error')
    }
  )

export const whenIsErr = { type: 'error' } as const
export const whenIsOk = { type: 'ok' } as const
