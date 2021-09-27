import { Todo } from '@prisma/client'

import { TodoInput } from '~/api/graphql/generated/graphql'

import { err, ok, Result } from '../common/result'
import { UseCase, UseCaseContext } from '../common/useCase'
import { ITodoRepository } from '../modules/todo/ITodoRepository'

export class TodoUseCase extends UseCase {
  public constructor(
    ctx: UseCaseContext,
    private readonly todoRepository: ITodoRepository
  ) {
    super(ctx)
  }

  public async save(
    todo: TodoInput
  ): Promise<Result<Todo, 'DATABASE' | 'RESOURCE_NOT_FOUND'>> {
    const currentUserId = this.ctx.currentUser?.id
    if (!currentUserId) {
      return err('RESOURCE_NOT_FOUND')
    }

    try {
      const result = await this.todoRepository.save(
        {
          title: todo.title,
          content: todo.content,
        },
        currentUserId
      )
      return ok(result)
    } catch (error) {
      return err('DATABASE')
    }
  }

  public async findAll(): Promise<Result<Todo[], 'DATABASE'>> {
    try {
      const result = await this.todoRepository.findAll()
      return ok(result)
    } catch (error) {
      return err('DATABASE')
    }
  }

  public async findByCurrentUser(): Promise<
    Result<Todo[], 'RESOURCE_NOT_FOUND' | 'DATABASE'>
  > {
    const currentUserId = this.ctx.currentUser?.id
    if (!currentUserId) {
      return err('RESOURCE_NOT_FOUND')
    }
    try {
      const result = await this.todoRepository.findByUserId(currentUserId)
      return ok(result)
    } catch (error) {
      return err('DATABASE')
    }
  }

  public async findById(
    id: number
  ): Promise<Result<Todo, 'RESOURCE_NOT_FOUND' | 'DATABASE'>> {
    try {
      const result = await this.todoRepository.findById(id)
      if (!result) {
        return err('RESOURCE_NOT_FOUND')
      }
      return ok(result)
    } catch (error) {
      return err('DATABASE')
    }
  }

  public async markAsCompleted(id: number): Promise<Result<Todo, 'DATABASE'>> {
    try {
      const result = await this.todoRepository.edit(
        {
          completed: true,
        },
        id
      )
      return ok(result)
    } catch (error) {
      return err('DATABASE')
    }
  }
}
