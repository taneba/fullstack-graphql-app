import { Todo } from '@prisma/client'
import { TodoInput } from '../api/graphql/generated/graphql'
import { ITodoRepository } from '../modules/todo/ITodoRepository'
import { UseCase, UseCaseContext } from './useCase'

export class TodoUseCase extends UseCase {
  public constructor(
    ctx: UseCaseContext,
    private readonly todoRepository: ITodoRepository
  ) {
    super(ctx)
  }

  public async save(todo: TodoInput): Promise<Todo> {
    return this.todoRepository.save(
      {
        title: todo.title,
        content: todo.content,
      },
      todo.authorId
    )
  }

  public async getAll(): Promise<Todo[]> {
    return this.todoRepository.getAll()
  }

  public async findOne(id: number): Promise<Todo> {
    const result = await this.todoRepository.findById(id)
    if (!result) {
      throw new Error('todo not found')
    }
    return result
  }
}
