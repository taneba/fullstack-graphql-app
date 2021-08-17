import { Todo, User } from '@prisma/client'
import { UserInput } from '../api/graphql/generated/graphql'
import { IUserRepository } from '../modules/user/IUserRepository'
import { UseCase, UseCaseContext } from './useCase'

export class UserUseCase extends UseCase {
  public constructor(
    ctx: UseCaseContext,
    private readonly userRepository: IUserRepository
  ) {
    super(ctx)
  }

  public async save(user: UserInput): Promise<User> {
    return this.userRepository.save({
      email: user.email,
      name: user.name,
    })
  }

  public async getAll(): Promise<User[]> {
    return this.userRepository.getAll()
  }

  public async findById(id: User['id']): Promise<User> {
    const result = await this.userRepository.findById(id)
    if (!result) {
      throw new Error('user not found')
    }
    return result
  }

  public async findByTodoId(id: Todo['id']): Promise<User> {
    const result = await this.userRepository.findByTodoId(id)
    if (!result) {
      throw new Error('user not found')
    }
    return result
  }
}
