import { GraphqlServerContext } from '../context'

export type UseCaseContext = Pick<GraphqlServerContext, 'prisma'>

export class UseCase {
  constructor(protected readonly ctx: UseCaseContext) {}
}
