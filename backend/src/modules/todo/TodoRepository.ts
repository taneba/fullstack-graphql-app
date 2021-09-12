import { Prisma,PrismaClient, Todo } from '@prisma/client'

import { ITodoRepository } from './ITodoRepository'

export class TodoRepository implements ITodoRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(todo: Prisma.TodoCreateWithoutAuthorInput, authorId: number) {
    return await this.prisma.todo.create({
      data: {
        title: todo.title,
        content: todo.content,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    })
  }

  async findById(id: number) {
    return this.prisma.todo.findUnique({
      where: { id },
    })
  }

  async delete(id: number) {
    return await this.prisma.todo.delete({
      where: { id },
    })
  }

  async edit(todo: Prisma.TodoUpdateInput, id: Todo['id']) {
    return await this.prisma.todo.update({
      where: { id: id },
      data: todo,
    })
  }

  async getAll() {
    return await this.prisma.todo.findMany()
  }

  async getByUser(id: number) {
    return await this.prisma.todo.findMany({
      where: {
        authorId: id,
      },
    })
  }
}
