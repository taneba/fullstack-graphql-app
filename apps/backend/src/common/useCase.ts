import { GraphqlServerContext } from '../context'

export type UseCaseContext = Pick<
  GraphqlServerContext,
  'prisma' | 'auth0' | 'authToken' | 'currentUser'
>

export class UseCase {
  constructor(protected readonly ctx: UseCaseContext) {}
}
