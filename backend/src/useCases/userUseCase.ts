import { EnvelopError } from '@envelop/core'
import { Todo, User } from '@prisma/client'
import got from 'got'
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
    const auth0UserInfo = await got<{ email: string }>(
      `https://${process.env.AUTH0_DOMAIN}/userinfo`,
      {
        headers: {
          Authorization: this.ctx.authToken,
          'Content-type': 'application/json',
        },
      }
    ).json<{ email: string }>()

    return this.userRepository.save({
      email: auth0UserInfo.email,
      name: user.name,
      uid: this.ctx.auth0?.sub,
    })
  }

  public async getAll(): Promise<User[]> {
    return this.userRepository.getAll()
  }

  public async findByUid(): Promise<User> {
    const uid = this.ctx.auth0?.sub
    if (!uid) {
      throw new Error('not authenticated')
    }
    const result = await this.userRepository.findByUid(uid)
    if (!result) {
      throw new Error('user not found')
    }
    return result
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
