import React from 'react'
import { Avatar, Spinner } from 'ui'
import { useQuery } from 'urql'

import { DevNote } from '~/components/general/DevNote'
import { gql } from '~/generated'
import { fromObject } from '~/utils/fromObject'

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
      <h1 className="text-3xl font-bold text-black">Profile</h1>
      <DevNote.Root>
        <DevNote.P>This page is a demo for accessing private field</DevNote.P>
      </DevNote.Root>
      <div>
        {res.fetching && <Spinner global />}
        {res.error && <p>error</p>}
        {res.data?.currentUser &&
          fromObject(res.data.currentUser)(({ name, email }) => (
            <div className="mt-6">
              <Avatar name={name} />
              <p className="ml-1 mt-2 text-lg font-bold">{name}</p>
              <p className="ml-1 text-sm">{email}</p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Profile
