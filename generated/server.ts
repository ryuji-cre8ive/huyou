import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Comment = {
  __typename?: 'Comment'
  content: Scalars['String']
  id: Scalars['ID']
  shopItemID: Scalars['ID']
  userID: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  createComment: Comment
  createShopItem: ShopItem
  createUser: User
}

export type MutationCreateCommentArgs = {
  input: NewComment
}

export type MutationCreateShopItemArgs = {
  input: NewShopItem
}

export type MutationCreateUserArgs = {
  input: NewUser
}

export type NewComment = {
  content: Scalars['String']
  id: Scalars['ID']
  shopItemID: Scalars['ID']
  userID: Scalars['String']
}

export type NewShopItem = {
  description?: InputMaybe<Scalars['String']>
  good?: InputMaybe<Scalars['Int']>
  id: Scalars['ID']
  image: Scalars['String']
  prise: Scalars['Int']
  title: Scalars['String']
}

export type NewUser = {
  assessment?: InputMaybe<Scalars['Int']>
  id: Scalars['ID']
  image?: InputMaybe<Scalars['String']>
  name: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  comments?: Maybe<Array<Maybe<Comment>>>
  item?: Maybe<ShopItem>
  items?: Maybe<Array<Maybe<ShopItem>>>
  users?: Maybe<Array<Maybe<User>>>
}

export type QueryItemArgs = {
  id: Scalars['ID']
}

export type ShopItem = {
  __typename?: 'ShopItem'
  comments?: Maybe<Array<Maybe<Comment>>>
  description?: Maybe<Scalars['String']>
  good: Scalars['Int']
  id: Scalars['ID']
  image: Scalars['String']
  prise: Scalars['Int']
  title: Scalars['String']
  user: User
  userID: Scalars['String']
}

export type User = {
  __typename?: 'User'
  ShopItem?: Maybe<Array<ShopItem>>
  assessment?: Maybe<Scalars['Int']>
  id: Scalars['ID']
  image?: Maybe<Scalars['String']>
  name: Scalars['String']
}

export type ItemFragmentFragment = {
  __typename?: 'ShopItem'
  id: string
  title: string
  description?: string | null
  image: string
  good: number
  prise: number
}

export type FetchUserQueryVariables = Exact<{ [key: string]: never }>

export type FetchUserQuery = {
  __typename?: 'Query'
  users?: Array<{ __typename?: 'User'; id: string; name: string } | null> | null
}

export type ShopItemsQueryVariables = Exact<{ [key: string]: never }>

export type ShopItemsQuery = {
  __typename?: 'Query'
  items?: Array<{ __typename?: 'ShopItem'; id: string; title: string; prise: number } | null> | null
}

export type FindItemQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type FindItemQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'ShopItem'
    id: string
    title: string
    description?: string | null
    image: string
    good: number
    prise: number
    user: { __typename?: 'User'; name: string; assessment?: number | null }
    comments?: Array<{ __typename?: 'Comment'; content: string; userID: string } | null> | null
  } | null
}

export const ItemFragmentFragmentDoc = gql`
  fragment ItemFragment on ShopItem {
    id
    title
    description
    image
    good
    prise
  }
`
export const FetchUserDocument = gql`
  query FetchUser {
    users {
      id
      name
    }
  }
`
export const ShopItemsDocument = gql`
  query ShopItems {
    items {
      id
      title
      prise
    }
  }
`
export const FindItemDocument = gql`
  query FindItem($id: ID!) {
    item(id: $id) {
      ...ItemFragment
      user {
        name
        assessment
      }
      comments {
        content
        userID
      }
    }
  }
  ${ItemFragmentFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action()

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    FetchUser(
      variables?: FetchUserQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<FetchUserQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FetchUserQuery>(FetchUserDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'FetchUser',
        'query',
      )
    },
    ShopItems(
      variables?: ShopItemsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<ShopItemsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ShopItemsQuery>(ShopItemsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'ShopItems',
        'query',
      )
    },
    FindItem(
      variables: FindItemQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<FindItemQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindItemQuery>(FindItemDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'FindItem',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
