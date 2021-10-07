import tw from 'twin.macro'
import { useQuery } from 'urql'

import { DevNote } from '~/components/general/DevNote'
import { gql } from '~/generated/'

const GetAllUsers = gql(/* GraphQL */ `
  query GetAllUsers {
    allUsers {
      id
      name
      email
    }
  }
`)

function Users() {
  const [res] = useQuery({ query: GetAllUsers })
  return (
    <div tw="mt-4">
      <h1 tw="text-black font-bold text-3xl">Users</h1>

      <DevNote.Root tw="self-center mx-auto bg-cyan-50 p-3 border-cyan-100 border-2 rounded-md">
        <DevNote.P tw="text-xs whitespace-pre-wrap leading-relaxed">
          Here we don't see any email of each user, which is a private field and
          shouldn't be visible to other people. This is because GetUsers query
          doesn't include email field.
        </DevNote.P>
        <DevNote.Pre>
          {`query GetAllUsers {
  allUsers {
    id
    name
  }
}
`}
        </DevNote.Pre>
        <DevNote.P>
          {`But if graphql api is not accurately implemented, email possiblly could be seen if hacker query manually.
So if it's wrong, curl request below unhappily works,
`}
        </DevNote.P>
        <DevNote.Pre>{`curl -X POST \\
-H "Content-Type: application/json" \\
-H "Authorization: Bearer <Token> \\
-d '{"query":"query GetAllUsers {allUsers {id name email __typename }}","operationName":"GetAllUsers","variables":{}}' \\
http://localhost:5000/graphql

{"data":{"allUsers":[{"id":"1","name":"John","email":"test@gmail.com","__typename":"User"},{"id":"2","name":"Paul","email":"test2@gmail.com","__typename":"User"}]}}
`}</DevNote.Pre>
      </DevNote.Root>
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

export default Users
