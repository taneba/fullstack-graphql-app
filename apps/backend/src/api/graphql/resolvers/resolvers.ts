import { GraphqlServerContext } from '../../../context'
import * as gql from '../generated/graphql'
import {
  todoMutationResolvers,
  todoQueryResolvers,
  todoResolvers,
} from './todoResolver'
import { userMutationResolvers, userQueryResolvers } from './userResolvers'

const resolvers: gql.Resolvers<GraphqlServerContext> = {
  Query: {
    time: () => Math.floor(Date.now() / 1000),
    ...todoQueryResolvers,
    ...userQueryResolvers,
  },
  Mutation: {
    ...todoMutationResolvers,
    ...userMutationResolvers,
  },
  Todo: todoResolvers,
}

export default resolvers
