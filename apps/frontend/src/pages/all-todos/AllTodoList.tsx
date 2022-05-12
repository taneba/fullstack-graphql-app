import { useQuery } from 'urql'

import { gql } from '~/generated'

const GetAllTodos = gql(/* GraphQL */ `
  query GetAllTodos {
    allTodos {
      id
      createdAt
      updatedAt
      title
      content
      completed
      author {
        name
      }
    }
  }
`)

export function AllTodoList() {
  const [res] = useQuery({ query: GetAllTodos })

  return (
    <div>
      {res.data && res.data.allTodos.length < 1 && <p>No Items</p>}
      {res.data?.allTodos.map((todo) => (
        <div key={todo.id}>
          <div>{todo.title}</div>
          <p>{todo.author?.name}</p>
        </div>
      ))}
    </div>
  )
}
