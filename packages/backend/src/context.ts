import chalk from 'chalk'
import { PrismaClient } from '@prisma/client'
import { TodoRepository } from './modules/todo/TodoRepository'
import { UserRepository } from './modules/user/UserRepository'
import { TodoUseCase } from './useCases/todoUseCase'
import { UserUseCase } from './useCases/userUseCase'

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
}

export function createContext(): GraphqlServerContext {
  return {
    prisma,
    useCase: {
      todo: new TodoUseCase({ prisma }, new TodoRepository(prisma)),
      user: new UserUseCase({ prisma }, new UserRepository(prisma)),
    },
  }
}
