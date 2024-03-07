import { Todo, User } from '@prisma/client'
import got from 'got'

import { UserInput } from '~/api/graphql/generated/graphql'
import { err, ok, Result } from '~/common/result'

import { UseCase, UseCaseContext } from '../common/useCase'
import { IUserRepository } from '../modules/user/IUserRepository'

export class UserUseCase extends UseCase {
  public constructor(
    ctx: UseCaseContext,
    private readonly userRepository: IUserRepository
  ) {
    super(ctx)
  }

  public async save(
    user: UserInput
  ): Promise<Result<User, 'AUTH0' | 'DATABASE'>> {
    const auth0UserInfo: any = await got(
      `https://${process.env.AUTH0_DOMAIN}/userinfo`,
      {
        headers: {
          Authorization: this.ctx.authToken,
          'Content-type': 'application/json',
        },
      }
    )
      .catch((e) => {
        console.log(e)
        return null
      })

    if (!auth0UserInfo) {
      console.log('failed to get auth0 user info')
      return err('AUTH0')
    }

    const uid = this.ctx.auth0?.sub

    if (!uid) {
      console.log('failed to get uid from auth0')
      return err('AUTH0')
    }
    try {
      const result = await this.userRepository.save({
        email: auth0UserInfo.email,
        name: user.name,
        uid: uid,
      })
      return ok(result)
    } catch (error) {
      return err('DATABASE')
    }
  }

  public async findCurrentUser(): Promise<
    Result<User, 'DATABASE' | 'RESOURCE_NOT_FOUND'>
  > {
    const currentUserId = this.ctx.currentUser?.id
    if (!currentUserId) {
      return err('RESOURCE_NOT_FOUND')
    }
    const result = await this.userRepository.findById(currentUserId)
    if (!result) {
      return err('RESOURCE_NOT_FOUND')
    }
    return ok(result)
  }

  public async findAll(): Promise<Result<User[], 'DATABASE'>> {
    try {
      const result = await this.userRepository.findAll()
      return ok(result)
    } catch (error) {
      return err('DATABASE')
    }
  }

  public async findById(
    id: User['id']
  ): Promise<Result<User, 'DATABASE' | 'RESOURCE_NOT_FOUND'>> {
    const result = await this.userRepository.findById(id)
    if (!result) {
      return err('RESOURCE_NOT_FOUND')
    }
    return ok(result)
  }

  public async findByTodoId(
    id: Todo['id']
  ): Promise<Result<User, 'DATABASE' | 'RESOURCE_NOT_FOUND'>> {
    try {
      const result = await this.userRepository.findByTodoId(id)
      if (!result) {
        return err('RESOURCE_NOT_FOUND')
      }
      return ok(result)
    } catch (error) {
      return err('DATABASE')
    }
  }
}
