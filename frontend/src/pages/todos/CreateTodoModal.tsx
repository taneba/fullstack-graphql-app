import { Modal } from 'src/components/Modal'
import { gql } from 'src/generated/graphql.ts'
import { useMutation } from 'urql'
import { TextField } from 'src/components/TextField'
import { Textarea } from 'src/components/TextArea'
import { Button } from 'src/components/Button'

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

  return (
    <Modal onClose={onClose} title="New Todo">
      title
      <TextField name="title" />
      content
      <Textarea name="content" />
      <Button primary>Submit</Button>
    </Modal>
  )
}
