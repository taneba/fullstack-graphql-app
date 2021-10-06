import { buildSchema } from 'graphql'

export const schema = buildSchema(/* GraphQL */ `
  enum Role {
    ADMIN
    USER
  }

  directive @auth(role: Role! = USER) on FIELD_DEFINITION
  directive @isOwner(ownerField: String) on MUTATION | FIELD_DEFINITION
  # directive @isOwnerOrHasRole(type: String, roles: [String]) on QUERY | MUTATION | FIELD_DEFINITION

  type Query {
    # health check
    time: Int!
    allTodos: [Todo!]! @auth(role: ADMIN)
    todosByCurrentUser: [Todo!]! @auth
    todo(id: ID!): Todo @auth @isOwner
    allUsers: [User!]! @auth
    currentUser: User @auth
  }

  type Mutation {
    saveTodo(todo: TodoInput!): Todo @auth
    saveUser(user: UserInput!): User
    completeTodo(id: ID!): Todo @auth
  }

  type Todo {
    id: ID!
    createdAt: String @isOwner(ownerField: "authorId")
    updatedAt: String
    title: String!
    content: String @isOwner(ownerField: "authorId") # private
    author: User
    authorId: String!
    completed: Boolean!
  }

  input TodoInput {
    title: String!
    content: String
  }

  type User {
    id: ID!
    email: String! @isOwner(ownerField: "id") # private
    name: String
  }

  input UserInput {
    email: String!
    name: String
  }
`)
