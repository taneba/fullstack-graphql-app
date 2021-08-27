import { buildSchema } from 'graphql'

export const schema = buildSchema(/* GraphQL */ `
  enum Role {
    ADMIN
    USER
  }

  directive @auth(role: Role! = USER) on FIELD_DEFINITION

  type Query {
    # health check
    time: Int!
    todos: [Todo!]! @auth
    users: [User!]! @auth(role: ADMIN)
  }

  type Mutation {
    saveTodo(todo: TodoInput!): Todo @auth
    saveUser(user: UserInput!): User
  }

  type Todo {
    id: ID!
    createdAt: String
    updatedAt: String
    title: String!
    content: String
    author: User
  }

  input TodoInput {
    title: String!
    content: String
    authorId: Int!
  }

  type User {
    id: ID!
    email: String!
    name: String
  }

  input UserInput {
    email: String!
    name: String
  }
`)
