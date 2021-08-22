import { useQuery } from 'urql'
import { gql } from 'src/generated/graphql.ts'
// TODO yarn link

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

  return (
    <div>
      <h1>Todos</h1>
      <pre tw="text-sm">
        {JSON.stringify(
          res.data?.todos.map((todo) => todo),
          null,
          2
        )}
      </pre>
    </div>
  )
}

export default Todos
