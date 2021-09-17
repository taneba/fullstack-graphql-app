import { Todo, User } from '@prisma/client'
import got from 'got'
import { err, ok, Result } from 'neverthrow'

import { UserInput } from '~/api/graphql/generated/graphql'

import { UseCase, UseCaseContext } from '../../common/useCase'
import { IUserRepository } from './IUserRepository'

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

  public async findAll(): Promise<User[]> {
    return this.userRepository.findAll()
  }

  public async findById(id: User['id']): Promise<User> {
    const result = await this.userRepository.findById(id)
    if (!result) {
      throw new Error('user not found')
    }
    return result
  }

  public async findByTodoId(id: Todo['id']): Promise<Result<User, Error>> {
    const result = await this.userRepository.findByTodoId(id)
    if (!result) {
      return err(new Error('user not found'))
    }
    return ok(result)
  }
}
