import { useCallback } from 'react'
import { useMutation } from 'urql'

import { gql } from '~/generated/'
import { Todo } from '~/generated/graphql'

interface Props {
  todo: Todo
}

const CompleteTodo = gql(/* GraphQL */ `
  mutation CompleteTodo($id: ID!) {
    completeTodo(id: $id) {
      id
    }
  }
`)

export function TodoItem({ todo }: Props) {
  const [, executeMutation] = useMutation(CompleteTodo)

  const handleClick = useCallback(() => {
    executeMutation({
      id: todo.id,
    })
  }, [executeMutation, todo.id])

  return (
    <div
      key={todo.id}
      role="todo"
      tw="flex flex-row items-center w-full py-1 px-4 my-1 rounded border bg-gray-100 text-gray-600"
    >
      <input type="checkbox" onClick={handleClick} />
      <p tw="pl-2">{todo.title}</p>
    </div>
  )
}
