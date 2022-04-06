import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { Spinner } from '~/components'
import { DevNote } from '~/components/general/DevNote'

import { AllTodoList } from './AllTodoList'

function AllTodos() {
  return (
    <div>
      <h1 tw="text-black font-bold text-3xl">Todos</h1>
      <p tw="text-red-400">
        You should have an admin role to see todos of all users
      </p>
      <DevNote.Root>
        <DevNote.P>
          This page is a demo for accessing resource which is only allowed for
          admin role user to see
        </DevNote.P>
      </DevNote.Root>
      <ErrorBoundary
        fallbackRender={(props) => <div>{JSON.stringify(props)}</div>}
      >
        <Suspense fallback={<Spinner />}>
          <AllTodoList />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default AllTodos
