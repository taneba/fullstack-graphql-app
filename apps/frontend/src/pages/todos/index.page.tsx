import { Suspense } from 'react'
import { Button, Dialog, DialogTrigger, Spinner } from 'ui'

import { DevNote } from '~/components/general/DevNote'

import { CreateTodoModal } from './CreateTodoModal'
import { TodoList } from './TodoList'

function Todos() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-black">Todos</h1>
      <DevNote.Root>
        <DevNote.P>
          This page represents the very basic example of GraphQL React
          application.
        </DevNote.P>
      </DevNote.Root>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-4">New Todo</Button>
        </DialogTrigger>
        <CreateTodoModal />
      </Dialog>
      <div className="mt-4">
        <Suspense fallback={<Spinner />}>
          <TodoList />
        </Suspense>
      </div>
    </div>
  )
}

export default Todos
