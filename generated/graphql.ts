import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String'];
  id: Scalars['ID'];
  shopItemID: Scalars['ID'];
  userID: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createShopItem: ShopItem;
  createUser: User;
};


export type MutationCreateCommentArgs = {
  input: NewComment;
};


export type MutationCreateShopItemArgs = {
  input: NewShopItem;
};


export type MutationCreateUserArgs = {
  input: NewUser;
};

export type NewComment = {
  content: Scalars['String'];
  id: Scalars['ID'];
  shopItemID: Scalars['ID'];
  userID: Scalars['String'];
};

export type NewShopItem = {
  description?: InputMaybe<Scalars['String']>;
  good?: InputMaybe<Scalars['Int']>;
  id: Scalars['ID'];
  image: Scalars['String'];
  title: Scalars['String'];
};

export type NewUser = {
  assessment?: InputMaybe<Scalars['Int']>;
  id: Scalars['ID'];
  image?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  comments?: Maybe<Array<Maybe<Comment>>>;
  items?: Maybe<Array<Maybe<ShopItem>>>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type ShopItem = {
  __typename?: 'ShopItem';
  comments?: Maybe<Array<Maybe<Comment>>>;
  description?: Maybe<Scalars['String']>;
  good: Scalars['Int'];
  id: Scalars['ID'];
  image: Scalars['String'];
  title: Scalars['String'];
  user: User;
  userID: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  ShopItem?: Maybe<Array<ShopItem>>;
  assessment?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type FetchUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchUserQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id: string, name: string } | null> | null };

export type ShopItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type ShopItemsQuery = { __typename?: 'Query', items?: Array<{ __typename?: 'ShopItem', id: string, title: string } | null> | null };


export const FetchUserDocument = gql`
    query FetchUser {
  users {
    id
    name
  }
}
    `;

export function useFetchUserQuery(options?: Omit<Urql.UseQueryArgs<FetchUserQueryVariables>, 'query'>) {
  return Urql.useQuery<FetchUserQuery, FetchUserQueryVariables>({ query: FetchUserDocument, ...options });
};
export const ShopItemsDocument = gql`
    query ShopItems {
  items {
    id
    title
  }
}
    `;

export function useShopItemsQuery(options?: Omit<Urql.UseQueryArgs<ShopItemsQueryVariables>, 'query'>) {
  return Urql.useQuery<ShopItemsQuery, ShopItemsQueryVariables>({ query: ShopItemsDocument, ...options });
};