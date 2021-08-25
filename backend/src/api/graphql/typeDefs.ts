import { buildSchema } from 'graphql'

export const schema = buildSchema(/* GraphQL */ `
  type Query {
    # health check
    time: Int!
    todos: [Todo!]!
    users: [User!]!
  }

  type Mutation {
    saveTodo(todo: TodoInput!): Todo
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
