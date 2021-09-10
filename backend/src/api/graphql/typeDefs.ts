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
    allTodos: [Todo!]! @auth
    todosByCurrentUser: [Todo!]! @auth
    allUsers: [User!]! @auth(role: ADMIN)
  }

  type Mutation {
    saveTodo(todo: TodoInput!): Todo @auth
    saveUser(user: UserInput!): User
    completeTodo(id: ID!): Todo @auth
  }

  type Todo {
    id: ID!
    createdAt: String
    updatedAt: String
    title: String!
    content: String
    author: User
    completed: Boolean!
  }

  input TodoInput {
    title: String!
    content: String
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
