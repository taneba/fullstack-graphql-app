import { Todo } from '~/generated/graphql'

import { nextFactoryId } from './factory'

export function todoFactory(options?: Partial<Todo>): Todo {
  return {
    __typename: 'Todo',
    id: nextFactoryId('Todo'),
    title: 'test todo',
    author: undefined,
    completed: false,
    ...options,
  }
}
