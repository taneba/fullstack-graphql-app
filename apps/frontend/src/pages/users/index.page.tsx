import { Suspense, useState } from 'react'

import { Spinner, TextField } from '~/components'

import { UserList } from './UserList'

function Users() {
  const [value, setValue] = useState('')

  return (
    <div tw="mt-4">
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name={'foo'}
      />
      <div>{value}</div>
      <h1 tw="text-black font-bold text-3xl">All Users</h1>
      <Suspense fallback={<Spinner />}>
        <UserList />
      </Suspense>
    </div>
  )
}

export default Users
