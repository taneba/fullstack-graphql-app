import { graphql, HttpResponse } from 'msw'

import { GetTodosQuery, GetTodosQueryVariables } from '~/generated/graphql'

import { todoFactory } from './factories/todo'

export const handlers = [
  graphql.query<GetTodosQuery, GetTodosQueryVariables>(
    'GetTodos',
    () => {
      return HttpResponse.json({
        data: {
          todosByCurrentUser: [todoFactory(), todoFactory()]
        }
      })
    }
  ),
]
