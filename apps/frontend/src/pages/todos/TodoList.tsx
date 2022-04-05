import { filter } from 'graphql-anywhere'
import { useQuery } from 'urql'

import { gql } from '~/generated'

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

export function TodoList() {
  const [res] = useQuery({
    query: GetTodos,
    requestPolicy: 'network-only', // for the sake of Suspense demo
  })

  return (
    <div>
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
  )
}
