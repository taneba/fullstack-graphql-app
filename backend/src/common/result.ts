import { AppErrorType } from './error'

type Ok<T> = { type: 'ok'; data: T }

type Err<E> = { type: 'error'; error: E }

export type Result<T, E extends AppErrorType> = Ok<T> | Err<E>

export const returnOk = <D>(data: D): Ok<D> => ({
  type: 'ok',
  data: data,
})

export const returnErr = <E extends AppErrorType>(error: E): Err<E> => ({
  type: 'error',
  error: error,
})
