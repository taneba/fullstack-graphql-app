/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};


export type Mutation = {
  __typename?: 'Mutation';
  saveTodo?: Maybe<Todo>;
  saveUser?: Maybe<User>;
};


export type MutationSaveTodoArgs = {
  todo: TodoInput;
};


export type MutationSaveUserArgs = {
  user: UserInput;
};

export type Query = {
  __typename?: 'Query';
  time: Scalars['Int'];
  todos: Array<Todo>;
  users: Array<User>;
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  author?: Maybe<User>;
};

export type TodoInput = {
  title: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  authorId: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type UserInput = {
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type SaveTodoMutationVariables = Exact<{
  todo: TodoInput;
}>;


export type SaveTodoMutation = { __typename?: 'Mutation', saveTodo?: Maybe<{ __typename: 'Todo', id: string }> };

export type GetTodosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTodosQuery = { __typename?: 'Query', todos: Array<{ __typename?: 'Todo', id: string, createdAt?: Maybe<string>, updatedAt?: Maybe<string>, title: string, content?: Maybe<string> }> };


export const SaveTodoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SaveTodo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"todo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TodoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveTodo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"todo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"todo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<SaveTodoMutation, SaveTodoMutationVariables>;
export const GetTodosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTodos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"todos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<GetTodosQuery, GetTodosQueryVariables>;