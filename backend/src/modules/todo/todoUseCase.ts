import { Todo } from '@prisma/client'
import { err, Ok, ok, Result } from 'neverthrow'

import { TodoInput } from '~/api/graphql/generated/graphql'

import { UseCase, UseCaseContext } from '../../common/useCase'
import { ITodoRepository } from './ITodoRepository'

export class TodoUseCase extends UseCase {
  public constructor(
    ctx: UseCaseContext,
    private readonly todoRepository: ITodoRepository
  ) {
    super(ctx)
  }

  public async save(todo: TodoInput): Promise<Result<Todo, Error>> {
    const currentUserId = this.ctx.currentUser?.id
    if (!currentUserId) {
      return err(new Error('User not found'))
    }
    const result = await this.todoRepository.save(
      {
        title: todo.title,
        content: todo.content,
      },
      currentUserId
    )
    return ok(result)
  }

  public async findAll(): Promise<Ok<Todo[], never>> {
    const result = await this.todoRepository.findAll()
    return ok(result)
  }

  public async findByCurrentUser(): Promise<Result<Todo[], Error>> {
    const currentUserId = this.ctx.currentUser?.id
    if (!currentUserId) {
      return err(new Error('User not found'))
    }
    const result = await this.todoRepository.findByUserId(currentUserId)
    return ok(result)
  }

  public async findById(id: number): Promise<Result<Todo, Error>> {
    const result = await this.todoRepository.findById(id)
    if (!result) {
      return err(new Error('Todo not found'))
    }
    return ok(result)
  }

  public async markAsCompleted(id: number): Promise<Ok<Todo, never>> {
    const result = await this.todoRepository.edit(
      {
        completed: true,
      },
      id
    )
    return ok(result)
  }
}
