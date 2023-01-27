/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  query GetProfile {\n    getProfile {\n      __typename\n      ... on User {\n        id\n        email\n        name\n        role\n        __typename\n      }\n      ... on UserNotFound {\n        message\n        role\n        __typename\n      }\n    }\n  }\n": types.GetProfileDocument,
    "\n  query GetAllTodos {\n    allTodos {\n      id\n      createdAt\n      updatedAt\n      title\n      content\n      completed\n      author {\n        name\n      }\n    }\n  }\n": types.GetAllTodosDocument,
    "\n  mutation SaveUser($user: UserInput!) {\n    saveUser(user: $user) {\n      id\n      __typename\n    }\n  }\n": types.SaveUserDocument,
    "\n  query GetCurrentUser {\n    currentUser {\n      id\n      name\n      email\n    }\n  }\n": types.GetCurrentUserDocument,
    "\n  mutation SaveTodo($todo: TodoInput!) {\n    saveTodo(todo: $todo) {\n      id\n      __typename\n    }\n  }\n": types.SaveTodoDocument,
    "\n  mutation CompleteTodo($id: ID!) {\n    completeTodo(id: $id) {\n      id\n    }\n  }\n": types.CompleteTodoDocument,
    "\n  fragment TodoItem_Todo on Todo {\n    id\n    title\n  }\n": types.TodoItem_TodoFragmentDoc,
    "\n  query GetTodos {\n    todosByCurrentUser {\n      ...TodoItem_Todo\n      id\n      completed\n    }\n  }\n": types.GetTodosDocument,
    "\n  query GetAllUsers {\n    allUsers {\n      id\n      name\n    }\n  }\n": types.GetAllUsersDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetProfile {\n    getProfile {\n      __typename\n      ... on User {\n        id\n        email\n        name\n        role\n        __typename\n      }\n      ... on UserNotFound {\n        message\n        role\n        __typename\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProfile {\n    getProfile {\n      __typename\n      ... on User {\n        id\n        email\n        name\n        role\n        __typename\n      }\n      ... on UserNotFound {\n        message\n        role\n        __typename\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllTodos {\n    allTodos {\n      id\n      createdAt\n      updatedAt\n      title\n      content\n      completed\n      author {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllTodos {\n    allTodos {\n      id\n      createdAt\n      updatedAt\n      title\n      content\n      completed\n      author {\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SaveUser($user: UserInput!) {\n    saveUser(user: $user) {\n      id\n      __typename\n    }\n  }\n"): (typeof documents)["\n  mutation SaveUser($user: UserInput!) {\n    saveUser(user: $user) {\n      id\n      __typename\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCurrentUser {\n    currentUser {\n      id\n      name\n      email\n    }\n  }\n"): (typeof documents)["\n  query GetCurrentUser {\n    currentUser {\n      id\n      name\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SaveTodo($todo: TodoInput!) {\n    saveTodo(todo: $todo) {\n      id\n      __typename\n    }\n  }\n"): (typeof documents)["\n  mutation SaveTodo($todo: TodoInput!) {\n    saveTodo(todo: $todo) {\n      id\n      __typename\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CompleteTodo($id: ID!) {\n    completeTodo(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CompleteTodo($id: ID!) {\n    completeTodo(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment TodoItem_Todo on Todo {\n    id\n    title\n  }\n"): (typeof documents)["\n  fragment TodoItem_Todo on Todo {\n    id\n    title\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetTodos {\n    todosByCurrentUser {\n      ...TodoItem_Todo\n      id\n      completed\n    }\n  }\n"): (typeof documents)["\n  query GetTodos {\n    todosByCurrentUser {\n      ...TodoItem_Todo\n      id\n      completed\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllUsers {\n    allUsers {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetAllUsers {\n    allUsers {\n      id\n      name\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;