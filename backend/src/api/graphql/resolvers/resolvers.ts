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
    time: (_parent, _params, _ctx) => Math.floor(Date.now() / 1000),
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
