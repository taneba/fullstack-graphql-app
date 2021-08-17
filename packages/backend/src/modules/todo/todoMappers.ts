import { Todo } from '@prisma/client'
import * as gql from '../../api/graphql/generated/graphql'

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
