import { User } from '@prisma/client'

import { gql } from '~/api/graphql/generated'

export class UserMapper {
  public static toGql(user: User): gql.User {
    return {
      ...user,
      id: user.id.toString(),
    }
  }

  public static toGqlCollection(user: User[]): gql.User[] {
    return user.map(this.toGql)
  }
}
