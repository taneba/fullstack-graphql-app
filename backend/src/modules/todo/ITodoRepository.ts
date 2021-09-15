import { Prisma, Todo } from '@prisma/client'

export interface ITodoRepository {
  save(
    todo: Prisma.TodoCreateWithoutAuthorInput,
    authorId: number
  ): Promise<Todo>
  findById(id: number): Promise<Todo | null>
  findAll(): Promise<Todo[]>
  findByUserId(id: number): Promise<Todo[]>
  edit(todo: Prisma.TodoUpdateInput, id: Todo['id']): Promise<Todo>
  delete(id: number): Promise<Todo>
}
