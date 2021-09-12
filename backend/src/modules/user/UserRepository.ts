import { Prisma,PrismaClient, User } from '@prisma/client'

import { IUserRepository } from './IUserRepository'

export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(user: Prisma.UserCreateWithoutTodosInput) {
    return await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
      },
    })
  }

  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
    })
  }

  async delete(id: number) {
    return await this.prisma.user.delete({
      where: { id },
    })
  }

  async edit(user: Prisma.UserUpdateInput, id: User['id']) {
    return await this.prisma.user.update({
      where: { id: id },
      data: user,
    })
  }

  async getAll() {
    return await this.prisma.user.findMany()
  }

  async findByTodoId(id: number) {
    return await this.prisma.todo.findUnique({ where: { id } }).author()
  }

  async findByUid(uid: string) {
    return await this.prisma.user.findUnique({ where: { uid } })
  }
}
