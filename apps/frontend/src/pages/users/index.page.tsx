import { Suspense } from 'react'

import { Spinner } from '~/components'

import { UserList } from './UserList'

function Users() {
  return (
    <div>
      <h1>All Users</h1>
      <Suspense fallback={<Spinner />}>
        <UserList />
      </Suspense>
    </div>
  )
}

export default Users
