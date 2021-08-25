import chalk from 'chalk'
import { PrismaClient } from '@prisma/client'
import { TodoRepository } from './modules/todo/TodoRepository'
import { UserRepository } from './modules/user/UserRepository'
import { TodoUseCase } from './useCases/todoUseCase'
import { UserUseCase } from './useCases/userUseCase'
import { UseCaseContext } from './useCases/useCase'

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})

prisma.$on('query', (e) => {
  console.log(chalk.magenta('Query: ') + chalk.bold(e.query))
  console.log('Duration: ' + e.duration + 'ms')
})

export interface GraphqlServerContext {
  prisma: PrismaClient
  useCase: {
    todo: TodoUseCase
    user: UserUseCase
  }
  auth0?: {
    sub: string
    iss: string
    aud: string[]
    iat: number
    exp: number
    azp: string
    scope: string
  }
  authToken?: string
}

export function createContext(
  ctx: Pick<GraphqlServerContext, 'auth0'> & { req: any }
): GraphqlServerContext {
  const authToken = ctx.req.headers.authorization
  const useCaseContext: UseCaseContext = { prisma, auth0: ctx.auth0 }

  return {
    prisma,
    useCase: {
      todo: new TodoUseCase(useCaseContext, new TodoRepository(prisma)),
      user: new UserUseCase(useCaseContext, new UserRepository(prisma)),
    },
    authToken,
  }
}
