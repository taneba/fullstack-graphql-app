import React from 'react'
import { useQuery } from 'urql'

import { Button, Dialog, DialogTrigger, Portal, Spinner } from '~/components'
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
  return (
    <div>
      <h1 tw="text-black font-bold text-3xl">Todos</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button primary tw="mt-4">
            New Todo
          </Button>
        </DialogTrigger>
        <CreateTodoModal />
      </Dialog>
      <div tw="mt-4">
        {res.fetching && (
          <Portal>
            <Spinner />
          </Portal>
        )}
        {res.data && res.data.todosByCurrentUser.length < 1 && <p>No Items</p>}
        {res.data?.todosByCurrentUser
          .filter(({ completed }) => !completed)
          .map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
      </div>
    </div>
  )
}

export default Todos
