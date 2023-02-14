import { z } from 'zod'
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  completeTodo?: Maybe<Todo>;
  saveTodo?: Maybe<Todo>;
  saveUser?: Maybe<User>;
};


export type MutationCompleteTodoArgs = {
  id: Scalars['ID'];
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
  time: Scalars['Int'];
  todo?: Maybe<Todo>;
  todosByCurrentUser: Array<Todo>;
};


export type QueryTodoArgs = {
  id: Scalars['ID'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Todo = {
  __typename?: 'Todo';
  author?: Maybe<User>;
  authorId: Scalars['String'];
  completed: Scalars['Boolean'];
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
};

export type TodoInput = {
  content?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  role: Role;
};

export type UserInput = {
  name: Scalars['String'];
};

export type UserNotFound = {
  __typename?: 'UserNotFound';
  message: Scalars['String'];
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
  return z.object<Properties<TodoInput>>({
    content: z.string().nullish(),
    title: z.string()
  })
}

export function UserInputSchema(): z.ZodObject<Properties<UserInput>> {
  return z.object<Properties<UserInput>>({
    name: z.string()
  })
}
