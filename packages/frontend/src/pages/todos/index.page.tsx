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
    <div tw="mt-4">
      <h1 tw="text-black font-bold text-3xl">Todos</h1>
      {res.data?.todos.map((todo) => (
        <div tw="flex flex-row items-center justify-between w-full py-1 px-4 my-1 rounded border bg-gray-100 text-gray-600">
          {todo.title}
        </div>
      ))}
    </div>
  )
}

export default Todos
