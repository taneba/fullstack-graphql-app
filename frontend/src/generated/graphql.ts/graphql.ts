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

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

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

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, email: string, name?: Maybe<string> }> };


export const SaveTodoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SaveTodo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"todo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TodoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveTodo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"todo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"todo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<SaveTodoMutation, SaveTodoMutationVariables>;
export const GetTodosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTodos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"todos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<GetTodosQuery, GetTodosQueryVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export interface TodoOptions {
  __typename?: 'Todo'
  id?: Todo['id']
  createdAt?: Todo['createdAt']
  updatedAt?: Todo['updatedAt']
  title?: Todo['title']
  content?: Todo['content']
  author?: UserOptions | null
}

export function newTodo(
  options: TodoOptions = {},
  cache: Record<string, any> = {}
): Todo {
  const o = (cache['Todo'] = {} as Todo)
  o.__typename = 'Todo'
  o.id = options.id ?? nextFactoryId('Todo')
  o.createdAt = options.createdAt ?? null
  o.updatedAt = options.updatedAt ?? null
  o.title = options.title ?? 'title'
  o.content = options.content ?? null
  o.author = maybeNewOrNullUser(options.author, cache)
  return o
}

function maybeNewTodo(
  value: TodoOptions | undefined,
  cache: Record<string, any>,
  isSet: boolean = false
): Todo {
  if (value === undefined) {
    return isSet ? undefined : cache['Todo'] || newTodo({}, cache)
  } else if (value.__typename) {
    return value as Todo
  } else {
    return newTodo(value, cache)
  }
}

function maybeNewOrNullTodo(
  value: TodoOptions | undefined | null,
  cache: Record<string, any>
): Todo | null {
  if (!value) {
    return null
  } else if (value.__typename) {
    return value as Todo
  } else {
    return newTodo(value, cache)
  }
}
export interface UserOptions {
  __typename?: 'User'
  id?: User['id']
  email?: User['email']
  name?: User['name']
}

export function newUser(
  options: UserOptions = {},
  cache: Record<string, any> = {}
): User {
  const o = (cache['User'] = {} as User)
  o.__typename = 'User'
  o.id = options.id ?? nextFactoryId('User')
  o.email = options.email ?? 'email'
  o.name = options.name ?? null
  return o
}

function maybeNewUser(
  value: UserOptions | undefined,
  cache: Record<string, any>,
  isSet: boolean = false
): User {
  if (value === undefined) {
    return isSet ? undefined : cache['User'] || newUser({}, cache)
  } else if (value.__typename) {
    return value as User
  } else {
    return newUser(value, cache)
  }
}

function maybeNewOrNullUser(
  value: UserOptions | undefined | null,
  cache: Record<string, any>
): User | null {
  if (!value) {
    return null
  } else if (value.__typename) {
    return value as User
  } else {
    return newUser(value, cache)
  }
}
let nextFactoryIds: Record<string, number> = {}

export function resetFactoryIds() {
  nextFactoryIds = {}
}

function nextFactoryId(objectName: string): string {
  const nextId = nextFactoryIds[objectName] || 1
  nextFactoryIds[objectName] = nextId + 1
  return String(nextId)
}
