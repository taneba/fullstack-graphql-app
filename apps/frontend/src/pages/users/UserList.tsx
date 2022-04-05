import { useQuery } from 'urql'

import { Avatar, Flex } from '~/components'
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
    <div tw="mt-4">
      {res.data && res.data.allUsers.length < 1 && <p>No Users</p>}
      {res.data &&
        res.data.allUsers.map((user) => (
          <Flex key={user.id} tw="p-2 items-center border-b-2 border-gray-100">
            <Avatar size="s" name={user.name || 'NN'} />
            <p tw="ml-2">{user.name}</p>
          </Flex>
        ))}
    </div>
  )
}
