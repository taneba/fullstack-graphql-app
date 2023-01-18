import { useCallback } from 'react'
import { useMutation } from 'urql'

import { gql } from '~/generated/'
import { TodoItem_TodoFragment } from '~/generated/graphql'

const CompleteTodo = gql(/* GraphQL */ `
  mutation CompleteTodo($id: ID!) {
    completeTodo(id: $id) {
      id
    }
  }
`)

const TodoItem_Todo = gql(/* GraphQL */ `
  fragment TodoItem_Todo on Todo {
    id
    title
  }
`)

TodoItem.fragments = {
  todo: TodoItem_Todo,
}

interface Props {
  todo: TodoItem_TodoFragment
}

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
      // tw="flex flex-row items-center w-full py-1 px-4 my-1 rounded border bg-gray-100 text-gray-600"
    >
      <input type="checkbox" onClick={handleClick} />
      <p
      //  tw="pl-2"
      >
        {todo.title}
      </p>
    </div>
  )
}
