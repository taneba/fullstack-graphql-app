import { Suspense } from 'react'
import { Spinner } from 'ui'

import { UserList } from './UserList'

function Users() {
  return (
    <div className="mt-4">
      <h1 className="text-3xl font-bold text-black">All Users</h1>
      <Suspense fallback={<Spinner />}>
        <UserList />
      </Suspense>
    </div>
  )
}

export default Users
