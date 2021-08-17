import { User } from '@prisma/client'
import * as gql from '../../api/graphql/generated/graphql'

export class UserMapper {
  public static toGql(user: User): gql.User {
    return {
      ...user,
      id: user.id.toString(),
    }
  }
}
