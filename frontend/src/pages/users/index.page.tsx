import { gql } from 'src/generated/graphql.ts'
import { useQuery } from 'urql'

const GetUsers = gql(/* GraphQL */ `
  query GetUsers {
    users {
      id
      email
      name
    }
  }
`)

function Users() {
  const [res] = useQuery({ query: GetUsers })
  return (
    <div tw="mt-4">
      <h1 tw="text-black font-bold text-3xl">Users</h1>

      <div tw="mt-4">
        {res.data && res.data.users.length < 1 && <p>No Users</p>}
        {res.data?.users.map((user) => (
          <div
            key={user.id}
            tw="flex flex-row items-center justify-between w-full py-1 px-4 my-1 rounded border bg-gray-100 text-gray-600"
          >
            {user.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Users
