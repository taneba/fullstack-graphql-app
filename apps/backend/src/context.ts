import { DefaultContext } from '@envelop/core'
import { PrismaClient, User } from '@prisma/client'
import chalk from 'chalk'

import { UseCaseContext } from './common/useCase'
import { TodoRepository } from './modules/todo/TodoRepository'
import { UserRepository } from './modules/user/UserRepository'
import { TodoUseCase } from './useCases/todoUseCase'
import { UserUseCase } from './useCases/userUseCase'

export const prisma = new PrismaClient({
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

export interface GraphqlServerContext extends DefaultContext {
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
  currentUser: User | null
}

export function createContext(
  ctx: Pick<GraphqlServerContext, 'auth0' | 'currentUser'> & { req: any }
): GraphqlServerContext {
  const { auth0, currentUser, req } = ctx
  const authToken = req.headers.authorization
  const useCaseContext: UseCaseContext = {
    prisma,
    auth0,
    currentUser,
    authToken,
  }
  console.log('authToken???', authToken)

  return {
    prisma,
    useCase: {
      todo: new TodoUseCase(useCaseContext, new TodoRepository(prisma)),
      user: new UserUseCase(useCaseContext, new UserRepository(prisma)),
    },
    authToken,
    userRole: 'User',
    currentUser,
  }
}
