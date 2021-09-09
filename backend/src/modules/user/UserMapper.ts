import { User } from '@prisma/client'
import { gql } from '~/api/graphql/generated'

export class UserMapper {
  public static toGql(user: User): gql.User {
    return {
      ...user,
      id: user.id.toString(),
    }
  }
}
