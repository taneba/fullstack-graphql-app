import { useState } from 'react'
import { useQuery } from 'urql'

import { Button } from '~/components/Button'
import { gql } from '~/generated'

import { CreateTodoModal } from './CreateTodoModal'
import { TodoItem } from './TodoItem'

const GetTodos = gql(/* GraphQL */ `
  query GetTodos {
    todosByCurrentUser {
      id
      createdAt
      updatedAt
      title
      content
      completed
    }
  }
`)

function Todos() {
  const [res] = useQuery({ query: GetTodos })
  const [isModalOpen, setModalOpen] = useState(false)
  return (
    <div>
      <h1 tw="text-black font-bold text-3xl">Todos</h1>

      <Button primary onClick={() => setModalOpen(true)} tw="mt-4">
        New Todo
      </Button>
      <div tw="mt-4">
        {res.data && res.data.todosByCurrentUser.length < 1 && <p>No Items</p>}
        {res.data?.todosByCurrentUser
          .filter(({ completed }) => !completed)
          .map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
      </div>
      {isModalOpen && <CreateTodoModal onClose={() => setModalOpen(false)} />}
    </div>
  )
}

export default Todos
