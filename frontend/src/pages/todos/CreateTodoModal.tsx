import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'urql'

import { Button } from '~/components/Button'
import { Modal } from '~/components/Modal'
import { TextArea } from '~/components/TextArea'
import { TextField } from '~/components/TextField'
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

export function CreateTodoModal({ onClose }: { onClose: () => void }) {
  const [, executeMutation] = useMutation(SaveTodo)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoInput>()
  const onSubmit: SubmitHandler<TodoInput> = async (data) => {
    executeMutation({
      todo: removeEmptyFields(data),
    })
  }

  return (
    <Modal onClose={onClose} title="New Todo">
      <form onSubmit={handleSubmit(onSubmit)} role="form">
        <label htmlFor={register('title').name}>title</label>
        <TextField
          id={register('title').name}
          {...register('title', { required: true })}
        />
        {errors.title && <span tw="text-red-500">title is required</span>}
        <label htmlFor={register('content').name}>content</label>
        <TextArea {...register('content')} />
        <Button primary type="submit">
          Submit
        </Button>
      </form>
    </Modal>
  )
}
