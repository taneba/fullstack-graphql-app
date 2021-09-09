import { gql } from '@app/gql'
import { useState } from 'react'
import { useQuery } from 'urql'

import { Button } from '~/components/Button'

import { CreateTodoModal } from './CreateTodoModal'

const GetTodos = gql(/* GraphQL */ `
  query GetTodos {
    todos {
      id
      createdAt
      updatedAt
      title
      content
    }
  }
`)

function Todos() {
  const [res] = useQuery({ query: GetTodos })
  const [isModalOpen, setModalOpen] = useState(false)
  console.log(res.data?.todos)
  return (
    <div tw="mt-4">
      <h1 tw="text-black font-bold text-3xl">Todos</h1>

      <Button primary onClick={() => setModalOpen(true)} tw="mt-4">
        New Todo
      </Button>
      <div tw="mt-4">
        {res.data && res.data.todos.length < 1 && <p>No Items</p>}
        {res.data?.todos.map((todo) => (
          <div
            key={todo.id}
            role="todo"
            tw="flex flex-row items-center justify-between w-full py-1 px-4 my-1 rounded border bg-gray-100 text-gray-600"
          >
            {todo.title}
          </div>
        ))}
      </div>
      {isModalOpen && <CreateTodoModal onClose={() => setModalOpen(false)} />}
    </div>
  )
}

export default Todos
