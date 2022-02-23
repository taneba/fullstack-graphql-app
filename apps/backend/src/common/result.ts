import { EnvelopError } from '@envelop/core'
import { match, Pattern, when } from 'ts-pattern'

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
  match(result).with<Pattern<any>, unknown, any>(
    { type: 'error', error: 'DATABASE' },
    () => {
      throw new EnvelopError('database error')
    }
  )

export const isOk = <T, E extends AppErrorType>(
  as: Result<T, E>
): as is Ok<T> => {
  return (as as Ok<T>).type === 'ok'
}

export const isErr = <T, E extends AppErrorType>(
  as: Result<T, E>
): as is Err<E> => {
  return (as as Err<E>).type === 'error'
}

export const whenIsOk = when(isOk)

export const whenIsErr = when(isErr)
