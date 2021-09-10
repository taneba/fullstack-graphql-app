/* eslint-disable */
import * as graphql from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  mutation SaveTodo($todo: TodoInput!) {\n    saveTodo(todo: $todo) {\n      id\n      __typename\n    }\n  }\n": graphql.SaveTodoDocument,
    "\n  mutation CompleteTodo($id: ID!) {\n    completeTodo(id: $id) {\n      id\n    }\n  }\n": graphql.CompleteTodoDocument,
    "\n  query GetTodos {\n    todosByCurrentUser {\n      id\n      createdAt\n      updatedAt\n      title\n      content\n      completed\n    }\n  }\n": graphql.GetTodosDocument,
    "\n  query GetUsers {\n    allUsers {\n      id\n      email\n      name\n    }\n  }\n": graphql.GetUsersDocument,
};

export function gql(source: "\n  mutation SaveTodo($todo: TodoInput!) {\n    saveTodo(todo: $todo) {\n      id\n      __typename\n    }\n  }\n"): (typeof documents)["\n  mutation SaveTodo($todo: TodoInput!) {\n    saveTodo(todo: $todo) {\n      id\n      __typename\n    }\n  }\n"];
export function gql(source: "\n  mutation CompleteTodo($id: ID!) {\n    completeTodo(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CompleteTodo($id: ID!) {\n    completeTodo(id: $id) {\n      id\n    }\n  }\n"];
export function gql(source: "\n  query GetTodos {\n    todosByCurrentUser {\n      id\n      createdAt\n      updatedAt\n      title\n      content\n      completed\n    }\n  }\n"): (typeof documents)["\n  query GetTodos {\n    todosByCurrentUser {\n      id\n      createdAt\n      updatedAt\n      title\n      content\n      completed\n    }\n  }\n"];
export function gql(source: "\n  query GetUsers {\n    allUsers {\n      id\n      email\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetUsers {\n    allUsers {\n      id\n      email\n      name\n    }\n  }\n"];

export function gql(source: string): unknown;
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<
  infer TType,
  any
>
  ? TType
  : never;
