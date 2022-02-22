/* eslint-disable */
import * as graphql from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query GetAllTodos {\n    allTodos {\n      id\n      createdAt\n      updatedAt\n      title\n      content\n      completed\n      author {\n        name\n      }\n    }\n  }\n": graphql.GetAllTodosDocument,
    "\n  query GetCurrentUser {\n    currentUser {\n      id\n      name\n      email\n    }\n  }\n": graphql.GetCurrentUserDocument,
    "\n  mutation SaveTodo($todo: TodoInput!) {\n    saveTodo(todo: $todo) {\n      id\n      __typename\n    }\n  }\n": graphql.SaveTodoDocument,
    "\n  mutation CompleteTodo($id: ID!) {\n    completeTodo(id: $id) {\n      id\n    }\n  }\n": graphql.CompleteTodoDocument,
    "\n  fragment TodoItem_Todo on Todo {\n    id\n    title\n  }\n": graphql.TodoItem_TodoFragmentDoc,
    "\n  query GetTodos {\n    todosByCurrentUser {\n      ...TodoItem_Todo\n      id\n      completed\n    }\n  }\n": graphql.GetTodosDocument,
    "\n  query GetAllUsers {\n    allUsers {\n      id\n      name\n    }\n  }\n": graphql.GetAllUsersDocument,
};

export function gql(source: "\n  query GetAllTodos {\n    allTodos {\n      id\n      createdAt\n      updatedAt\n      title\n      content\n      completed\n      author {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllTodos {\n    allTodos {\n      id\n      createdAt\n      updatedAt\n      title\n      content\n      completed\n      author {\n        name\n      }\n    }\n  }\n"];
export function gql(source: "\n  query GetCurrentUser {\n    currentUser {\n      id\n      name\n      email\n    }\n  }\n"): (typeof documents)["\n  query GetCurrentUser {\n    currentUser {\n      id\n      name\n      email\n    }\n  }\n"];
export function gql(source: "\n  mutation SaveTodo($todo: TodoInput!) {\n    saveTodo(todo: $todo) {\n      id\n      __typename\n    }\n  }\n"): (typeof documents)["\n  mutation SaveTodo($todo: TodoInput!) {\n    saveTodo(todo: $todo) {\n      id\n      __typename\n    }\n  }\n"];
export function gql(source: "\n  mutation CompleteTodo($id: ID!) {\n    completeTodo(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CompleteTodo($id: ID!) {\n    completeTodo(id: $id) {\n      id\n    }\n  }\n"];
export function gql(source: "\n  fragment TodoItem_Todo on Todo {\n    id\n    title\n  }\n"): (typeof documents)["\n  fragment TodoItem_Todo on Todo {\n    id\n    title\n  }\n"];
export function gql(source: "\n  query GetTodos {\n    todosByCurrentUser {\n      ...TodoItem_Todo\n      id\n      completed\n    }\n  }\n"): (typeof documents)["\n  query GetTodos {\n    todosByCurrentUser {\n      ...TodoItem_Todo\n      id\n      completed\n    }\n  }\n"];
export function gql(source: "\n  query GetAllUsers {\n    allUsers {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetAllUsers {\n    allUsers {\n      id\n      name\n    }\n  }\n"];

export function gql(source: string): unknown;
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;