import { Todo } from '@prisma/client'
import { gql } from '~/api/graphql/generated'

export class TodoMapper {
  public static toGql(todo: Todo): gql.Todo {
    return {
      ...todo,
      id: todo.id.toString(),
      createdAt: todo.createdAt?.toString(),
      updatedAt: todo.updatedAt?.toString(),
    }
  }
}
