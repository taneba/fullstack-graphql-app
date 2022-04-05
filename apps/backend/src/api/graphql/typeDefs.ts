import { buildSchema } from 'graphql'

export const schema = buildSchema(/* GraphQL */ `
  enum Role {
    ADMIN
    USER
  }

  directive @auth(role: Role! = USER) on FIELD_DEFINITION
  directive @isOwner(ownerField: String) on FIELD_DEFINITION | OBJECT
  # TODO: directive @isOwnerOrHasRole(type: String, roles: [String]) on QUERY | MUTATION | FIELD_DEFINITION

  type Query {
    # health check
    time: Int!
    allTodos: [Todo!]! @auth(role: ADMIN)
    todosByCurrentUser: [Todo!]! @auth
    todo(id: ID!): Todo @auth
    allUsers: [User!]! @auth
    currentUser: User @auth
    getProfile: ProfileResult @auth
  }

  union ProfileResult = User | UserNotFound

  type UserNotFound {
    message: String!
    role: Role!
  }

  type Mutation {
    saveTodo(todo: TodoInput!): Todo @auth
    saveUser(user: UserInput!): User
    completeTodo(id: ID!): Todo @auth
  }

  type Todo @isOwner(ownerField: "authorId") {
    id: ID!
    createdAt: String
    updatedAt: String
    title: String!
    content: String
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
    role: Role!
  }

  input UserInput {
    name: String!
  }
`)
