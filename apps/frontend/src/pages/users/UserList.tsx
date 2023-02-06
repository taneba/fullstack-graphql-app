import { Avatar, VStack } from 'ui'
import { useQuery } from 'urql'

import { gql } from '~/generated/'

const GetAllUsers = gql(/* GraphQL */ `
  query GetAllUsers {
    allUsers {
      id
      name
    }
  }
`)

export function UserList() {
  const [res] = useQuery({ query: GetAllUsers })

  return (
    <div className="mt-4">
      {res.data && res.data.allUsers.length < 1 && <p>No Users</p>}
      {res.data &&
        res.data.allUsers.map((user) => (
          <VStack
            key={user.id}
            className="items-center border-b-2 border-gray-100 p-2"
          >
            <Avatar name={user.name || 'NN'} />
            <p className="ml-2">{user.name}</p>
          </VStack>
        ))}
    </div>
  )
}
