import { Prisma, User } from '@prisma/client'

export interface IUserRepository {
  save(user: Prisma.UserCreateInput): Promise<User>
  findById(id: number): Promise<User | null>
  getAll(): Promise<Array<User>>
  edit(user: Prisma.UserUpdateInput, id: User['id']): Promise<User>
  delete(id: number): Promise<User>
  findByTodoId(id: number): Promise<User | null>
}
