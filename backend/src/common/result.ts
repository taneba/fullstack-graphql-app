import { AppErrorType } from './error'

type Ok<Data> = { type: 'ok'; data: Data }

type Err<Error> = { type: 'error'; error: Error }

export type Result<Data, Error extends AppErrorType> = Ok<Data> | Err<Error>

export const returnOk = <D>(data: D): Ok<D> => ({
  type: 'ok',
  data: data,
})

export const returnErr = <E extends AppErrorType>(error: E): Err<E> => ({
  type: 'error',
  error: error,
})
