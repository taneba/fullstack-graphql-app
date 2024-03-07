import { z } from 'zod'
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  completeTodo?: Maybe<Todo>;
  saveTodo?: Maybe<Todo>;
  saveUser?: Maybe<User>;
};


export type MutationCompleteTodoArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSaveTodoArgs = {
  todo: TodoInput;
};


export type MutationSaveUserArgs = {
  user: UserInput;
};

export type ProfileResult = User | UserNotFound;

export type Query = {
  __typename?: 'Query';
  allTodos: Array<Todo>;
  allUsers: Array<User>;
  currentUser?: Maybe<User>;
  getProfile?: Maybe<ProfileResult>;
  time: Scalars['Int']['output'];
  todo?: Maybe<Todo>;
  todosByCurrentUser: Array<Todo>;
};


export type QueryTodoArgs = {
  id: Scalars['ID']['input'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Todo = {
  __typename?: 'Todo';
  author?: Maybe<User>;
  authorId: Scalars['String']['output'];
  completed: Scalars['Boolean']['output'];
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type TodoInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  role: Role;
};

export type UserInput = {
  name: Scalars['String']['input'];
};

export type UserNotFound = {
  __typename?: 'UserNotFound';
  message: Scalars['String']['output'];
  role: Role;
};


type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export const RoleSchema = z.nativeEnum(Role);

export function TodoInputSchema(): z.ZodObject<Properties<TodoInput>> {
  return z.object({
    content: z.string().nullish(),
    title: z.string()
  })
}

export function UserInputSchema(): z.ZodObject<Properties<UserInput>> {
  return z.object({
    name: z.string()
  })
}
