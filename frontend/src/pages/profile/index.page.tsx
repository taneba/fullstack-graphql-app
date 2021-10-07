import { useQuery } from 'urql'

import { Spinner } from '~/components'
import { DevNote } from '~/components/general/DevNote'
import { gql } from '~/generated'

const GetCurrentUser = gql(/* GraphQL */ `
  query GetCurrentUser {
    currentUser {
      id
      name
      email
    }
  }
`)

function Profile() {
  const [res] = useQuery({ query: GetCurrentUser })

  return (
    <div>
      <h1 tw="text-black font-bold text-3xl">Profile</h1>
      <DevNote.Root>
        <DevNote.P>This page is a demo for accessing private field</DevNote.P>
      </DevNote.Root>

      <div>
        {res.fetching && <Spinner global />}
        {JSON.stringify(res.data)}
      </div>
    </div>
  )
}

export default Profile
