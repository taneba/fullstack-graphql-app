import { Todo } from '@prisma/client'
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

  public async getAll(): Promise<Todo[]> {
    return this.todoRepository.getAll()
  }

  public async getByCurrentUser(): Promise<Todo[]> {
    const currentUserId = this.ctx.currentUser?.id
    if (!currentUserId) {
      throw new Error('User not found')
    }
    return this.todoRepository.getByUser(currentUserId)
  }

  public async findOne(id: number): Promise<Todo> {
    const result = await this.todoRepository.findById(id)
    if (!result) {
      throw new Error('todo not found')
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
