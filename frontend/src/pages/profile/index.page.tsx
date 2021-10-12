import React from 'react'
import { useQuery } from 'urql'

import { Avatar, Spinner } from '~/components'
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
      <h1 tw="text-black font-bold text-3xl">Profile</h1>
      <DevNote.Root>
        <DevNote.P>This page is a demo for accessing private field</DevNote.P>
      </DevNote.Root>
      <div>
        {res.fetching && <Spinner global />}
        {res.error && <p>error</p>}
        {res.data?.currentUser &&
          fromObject(res.data.currentUser)(({ name, email }) => (
            <div tw="mt-6">
              <Avatar name={name} size="l" />
              <p tw="text-lg ml-1 mt-2 font-bold">{name}</p>
              <p tw="text-sm ml-1">{email}</p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Profile
