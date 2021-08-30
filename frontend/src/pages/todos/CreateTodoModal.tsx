import { Modal } from 'src/components/Modal'
import { gql } from 'src/generated/graphql.ts'
import { useMutation } from 'urql'
import { TextField } from 'src/components/TextField'
import { Textarea } from 'src/components/TextArea'
import { Button } from 'src/components/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TodoInput } from 'src/generated/graphql.ts/graphql'
import { removeEmptyFields } from 'src/utils/form'

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
    watch,
    formState: { errors },
  } = useForm<TodoInput>()
  const onSubmit: SubmitHandler<TodoInput> = async (data) => {
    removeEmptyFields(data)
    executeMutation({
      todo: data,
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
        <Textarea {...register('content')} />
        <Button primary type="submit">
          Submit
        </Button>
      </form>
    </Modal>
  )
}
