import { graphql } from 'msw'

import { GetTodosDocument, newTodo } from '~/generated/graphql.ts/graphql'

export const handlers = [
  graphql.query(GetTodosDocument, (req, res, ctx) =>
    res(
      ctx.data({
        todos: [newTodo(), newTodo()],
      })
    )
  ),
]
