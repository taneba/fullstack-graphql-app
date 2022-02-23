import { Role, User } from '~/generated/graphql'

import { nextFactoryId } from './factory'

export function userFactory(options?: Partial<User>): User {
  return {
    __typename: 'User',
    id: nextFactoryId('User'),
    email: 'esample@gmail.com',
    name: 'Jon Doe',
    role: Role.User,
    ...options,
  }
}
