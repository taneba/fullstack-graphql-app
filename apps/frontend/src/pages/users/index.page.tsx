import { Suspense } from 'react'

import { Spinner } from '~/components'

import { UserList } from './UserList'

function Users() {
  return (
    <div tw="mt-4">
      <h1 tw="text-black font-bold text-3xl">All Users</h1>
      <Suspense fallback={<Spinner />}>
        <UserList />
      </Suspense>
    </div>
  )
}

export default Users
