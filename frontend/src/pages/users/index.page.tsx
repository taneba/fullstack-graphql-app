import tw from 'twin.macro'
import { useQuery } from 'urql'

import { gql } from '~/generated/'

const GetUsers = gql(/* GraphQL */ `
  query GetUsers {
    allUsers {
      id
      name
    }
  }
`)

function Users() {
  const [res] = useQuery({ query: GetUsers })
  return (
    <div tw="mt-4">
      <h1 tw="text-black font-bold text-3xl">Users</h1>

      <P tw="text-xs whitespace-pre-wrap leading-relaxed">
        {`
NOTE: Here we don't see any email of each user, which is a private field and shouldn't be visible to other people. This is because GetUsers query doesn't include email field.
But if graphql api is not accurately implemented, email possiblly could be seen if hacker query manually.
So if it's unsecurely implemented, if run below,
`}
      </P>

      <pre tw="border-gray-600 bg-gray-200 text-xs p-1 overflow-x-scroll my-2">{`curl -X POST \\
-H "Content-Type: application/json" \\
-H "Authorization: Bearer <Token> \\
-d '{"query":"query GetUsers {allUsers {id name email __typename }}","operationName":"GetUsers","variables":{}}' \\
http://localhost:5000/graphql
`}</pre>

      <P tw="text-xs whitespace-pre-wrap">
        Then you got email as well as id and name.
      </P>

      <div tw="mt-4">
        {res.data && res.data.allUsers.length < 1 && <p>No Users</p>}
        {res.data?.allUsers.map((user) => (
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

const P = tw.p`text-xs whitespace-pre-wrap`

export default Users
