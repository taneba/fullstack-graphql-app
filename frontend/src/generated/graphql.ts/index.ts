/* eslint-disable */
import * as graphql from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  mutation SaveTodo($todo: TodoInput!) {\n    saveTodo(todo: $todo) {\n      id\n      __typename\n    }\n  }\n": graphql.SaveTodoDocument,
    "\n  query GetTodos {\n    todos {\n      id\n      createdAt\n      updatedAt\n      title\n      content\n    }\n  }\n": graphql.GetTodosDocument,
};

export function gql(source: "\n  mutation SaveTodo($todo: TodoInput!) {\n    saveTodo(todo: $todo) {\n      id\n      __typename\n    }\n  }\n"): (typeof documents)["\n  mutation SaveTodo($todo: TodoInput!) {\n    saveTodo(todo: $todo) {\n      id\n      __typename\n    }\n  }\n"];
export function gql(source: "\n  query GetTodos {\n    todos {\n      id\n      createdAt\n      updatedAt\n      title\n      content\n    }\n  }\n"): (typeof documents)["\n  query GetTodos {\n    todos {\n      id\n      createdAt\n      updatedAt\n      title\n      content\n    }\n  }\n"];

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
