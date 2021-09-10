import { graphql } from 'msw'

import { GetTodosDocument } from '~/generated/graphql'

import { todoFactory } from './factories/todo'

export const handlers = [
  graphql.query(GetTodosDocument, (req, res, ctx) =>
    res(
      ctx.data({
        todosByCurrentUser: [todoFactory(), todoFactory()],
      })
    )
  ),
]
