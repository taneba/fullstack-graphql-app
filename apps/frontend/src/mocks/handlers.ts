import { graphql } from 'msw'

import { GetTodosQuery, GetTodosQueryVariables } from '~/generated/graphql'

import { todoFactory } from './factories/todo'

export const handlers = [
  graphql.query<GetTodosQuery, GetTodosQueryVariables>(
    'GetTodos',
    (req, res, ctx) =>
      res(
        ctx.data({
          todosByCurrentUser: [todoFactory(), todoFactory()],
        })
      )
  ),
]
