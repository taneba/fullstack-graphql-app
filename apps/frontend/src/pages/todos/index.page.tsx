import { filter } from 'graphql-anywhere'
import { useQuery } from 'urql'

import { Button, Dialog, DialogTrigger, Spinner } from '~/components'
import { DevNote } from '~/components/general/DevNote'
import { gql } from '~/generated'

import { CreateTodoModal } from './CreateTodoModal'
import { TodoItem } from './TodoItem'

const GetTodos = gql(/* GraphQL */ `
  query GetTodos {
    todosByCurrentUser {
      ...TodoItem_Todo
      id
      completed
    }
  }
`)

function Todos() {
  const [res] = useQuery({ query: GetTodos })
  return (
    <div>
      <h1 tw="text-black font-bold text-3xl">Todos</h1>
      <DevNote.Root>
        <DevNote.P>
          This page represents the very basic example of GraphQL React
          application.
        </DevNote.P>
      </DevNote.Root>
      <Dialog>
        <DialogTrigger asChild>
          <Button primary tw="mt-4">
            New Todo
          </Button>
        </DialogTrigger>
        <CreateTodoModal />
      </Dialog>
      <div tw="mt-4">
        {res.fetching && <Spinner global />}
        {res.data && res.data.todosByCurrentUser.length < 1 && <p>No Items</p>}
        {res.data?.todosByCurrentUser
          .filter(({ completed }) => !completed)
          .map((todo) => (
            <TodoItem
              key={todo.id}
              todo={filter(TodoItem.fragments.todo, todo)}
            />
          ))}
      </div>
    </div>
  )
}

export default Todos
