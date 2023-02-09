import { z } from 'zod'
import { TodoInput, UserInput } from './generated/graphql'

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>
}>

export const TodoInputSchema = z.object<Properties<TodoInput>>({
  title: z
    .string()
    .max(40, { message: 'Must be 24 or fewer characters long' })
    .min(1, { message: 'required' }),
  content: z
    .string()
    .max(250, { message: 'Must be 24 or fewer characters long' })
    .nullish(),
})

export const UserInputSchema = z.object<Properties<UserInput>>({
  name: z.string().max(24, { message: 'Must be 24 or fewer characters long' }),
})
