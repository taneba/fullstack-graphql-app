import { useQuery } from 'urql'

import { Spinner } from '~/components'
import { DevNote } from '~/components/general/DevNote'
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

function AllTodos() {
  const [res] = useQuery({ query: GetAllTodos })

  return (
    <div>
      <h1 tw="text-black font-bold text-3xl">Todos</h1>
      <p tw="text-red11">
        You should have an admin role to see todos of all users
      </p>
      <DevNote.Root>
        <DevNote.P>
          This page is a demo for accessing resource which is only allowed for
          admin role user to see
        </DevNote.P>
      </DevNote.Root>

      <div>
        {res.fetching && <Spinner global />}
        {res.data && res.data.allTodos.length < 1 && <p>No Items</p>}
        {res.data?.allTodos.map((todo) => (
          <div key={todo.id}>
            <div>{todo.title}</div>
            <p>{todo.author?.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllTodos
