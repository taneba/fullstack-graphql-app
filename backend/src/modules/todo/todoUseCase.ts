import { Todo } from '@prisma/client'

import { TodoInput } from '~/api/graphql/generated/graphql'
import { Result, returnErr, returnOk } from '~/common/result'

import { UseCase, UseCaseContext } from '../../common/useCase'
import { ITodoRepository } from './ITodoRepository'

export class TodoUseCase extends UseCase {
  public constructor(
    ctx: UseCaseContext,
    private readonly todoRepository: ITodoRepository
  ) {
    super(ctx)
  }

  public async save(todo: TodoInput): Promise<Todo> {
    const currentUserId = this.ctx.currentUser?.id
    if (!currentUserId) {
      throw new Error('User not found')
    }

    return this.todoRepository.save(
      {
        title: todo.title,
        content: todo.content,
      },
      currentUserId
    )
  }

  public async findAll(): Promise<Todo[]> {
    return this.todoRepository.findAll()
  }

  public async findByCurrentUser(): Promise<
    Result<Todo[], 'RESOURCE_NOT_FOUND' | 'DATABASE'>
  > {
    const currentUserId = this.ctx.currentUser?.id
    if (!currentUserId) {
      return returnErr('RESOURCE_NOT_FOUND')
    }
    try {
      const result = await this.todoRepository.findByUserId(currentUserId)
      return returnOk(result)
    } catch (error) {
      return returnErr('DATABASE')
    }
  }

  public async findById(id: number): Promise<Todo> {
    const result = await this.todoRepository.findById(id)
    if (!result) {
      throw new Error('Todo not found')
    }
    return result
  }

  public async markAsCompleted(id: number): Promise<Todo> {
    const result = await this.todoRepository.edit(
      {
        completed: true,
      },
      id
    )
    return result
  }
}
