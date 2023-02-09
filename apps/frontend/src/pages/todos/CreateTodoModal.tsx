import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  Button,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  VStack,
} from 'ui'
import { useMutation } from 'urql'
import { TodoInputSchema } from 'validation-schema'

import { TextArea, TextField } from '~/components'
import { gql } from '~/generated'
import { TodoInput } from '~/generated/graphql'
import { removeEmptyFields } from '~/utils/form'

const SaveTodo = gql(/* GraphQL */ `
  mutation SaveTodo($todo: TodoInput!) {
    saveTodo(todo: $todo) {
      id
      __typename
    }
  }
`)

export function CreateTodoModal() {
  const [, executeMutation] = useMutation(SaveTodo)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoInput>({
    resolver: zodResolver(TodoInputSchema),
    mode: 'onBlur',
  })
  const onSubmit: SubmitHandler<TodoInput> = async (data) => {
    try {
      await executeMutation({
        todo: removeEmptyFields(data),
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DialogContent>
      <DialogTitle>New Todo</DialogTitle>
      <DialogDescription>add a new todo</DialogDescription>
      <form onSubmit={handleSubmit(onSubmit)} role="form">
        <VStack space={2}>
          <div>
            <label htmlFor={register('title').name}>title</label>
            <TextField
              id={register('title').name}
              {...register('title', { required: true })}
            />
            {errors.title && (
              <p className="text-red-400">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label htmlFor={register('content').name}>content</label>
            <TextArea {...register('content')} />
            {errors.content && (
              <p className="text-red-400">{errors.content.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </VStack>
      </form>
    </DialogContent>
  )
}
