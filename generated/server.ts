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

export type Follower = {
  __typename?: 'Follower'
  id: Scalars['ID']
  targetUser: Array<User>
  targetUserID: Scalars['String']
  userID: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  appendNameForCreatedUser: User
  createComment: Comment
  createShopItem?: Maybe<ShopItem>
  createUser: User
  follow: Follower
  unfollow: Scalars['Boolean']
}

export type MutationAppendNameForCreatedUserArgs = {
  image: Scalars['String']
  name: Scalars['String']
  userID: Scalars['String']
}

export type MutationCreateCommentArgs = {
  input: NewComment
}

export type MutationCreateShopItemArgs = {
  description?: InputMaybe<Scalars['String']>
  image?: InputMaybe<Scalars['String']>
  isContainDelivery: Scalars['Boolean']
  price: Scalars['Int']
  title: Scalars['String']
  userID: Scalars['String']
}

export type MutationCreateUserArgs = {
  mail: Scalars['String']
  password: Scalars['String']
}

export type MutationFollowArgs = {
  targetUserId: Scalars['ID']
  userId: Scalars['ID']
}

export type MutationUnfollowArgs = {
  targetUserId: Scalars['ID']
  userId: Scalars['ID']
}

export type NewComment = {
  content: Scalars['String']
  id: Scalars['ID']
  shopItemID: Scalars['ID']
  userID: Scalars['String']
}

export type NewUser = {
  assessment?: InputMaybe<Scalars['Int']>
  id: Scalars['ID']
  image?: InputMaybe<Scalars['String']>
  name: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  comments: Array<Maybe<Comment>>
  followers: Array<Maybe<Follower>>
  following: Array<Maybe<Follower>>
  item: ShopItem
  items: Array<ShopItem>
  user?: Maybe<User>
  userWithMail?: Maybe<User>
  users: Array<User>
}

export type QueryFollowersArgs = {
  targetUserId: Scalars['ID']
}

export type QueryFollowingArgs = {
  userId: Scalars['ID']
}

export type QueryItemArgs = {
  id: Scalars['ID']
}

export type QueryUserArgs = {
  id: Scalars['ID']
}

export type QueryUserWithMailArgs = {
  mail: Scalars['String']
  password: Scalars['String']
}

export type ShopItem = {
  __typename?: 'ShopItem'
  comments?: Maybe<Array<Maybe<Comment>>>
  description?: Maybe<Scalars['String']>
  good: Scalars['Int']
  id: Scalars['ID']
  image: Scalars['String']
  isContainDelivery: Scalars['Boolean']
  price: Scalars['Int']
  title: Scalars['String']
  user: User
  userID: Scalars['String']
}

export type User = {
  __typename?: 'User'
  Followers: Array<Follower>
  ShopItem?: Maybe<Array<ShopItem>>
  assessment?: Maybe<Scalars['Int']>
  id: Scalars['ID']
  image?: Maybe<Scalars['String']>
  mail: Scalars['String']
  name: Scalars['String']
  password: Scalars['String']
}

export type ItemFragmentFragment = {
  __typename?: 'ShopItem'
  id: string
  title: string
  description?: string | null
  image: string
  good: number
  price: number
}

export type FetchUserQueryVariables = Exact<{ [key: string]: never }>

export type FetchUserQuery = {
  __typename?: 'Query'
  users: Array<{ __typename?: 'User'; id: string; name: string }>
}

export type UserIDsQueryVariables = Exact<{ [key: string]: never }>

export type UserIDsQuery = {
  __typename?: 'Query'
  users: Array<{ __typename?: 'User'; id: string }>
}

export type ShopItemsTopQueryVariables = Exact<{ [key: string]: never }>

export type ShopItemsTopQuery = {
  __typename?: 'Query'
  items: Array<{ __typename?: 'ShopItem'; id: string; title: string; price: number; image: string }>
}

export type ShopItemIDsQueryVariables = Exact<{ [key: string]: never }>

export type ShopItemIDsQuery = {
  __typename?: 'Query'
  items: Array<{ __typename?: 'ShopItem'; id: string }>
}

export type FindItemQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type FindItemQuery = {
  __typename?: 'Query'
  item: {
    __typename?: 'ShopItem'
    id: string
    title: string
    description?: string | null
    image: string
    good: number
    price: number
    user: { __typename?: 'User'; id: string; name: string; assessment?: number | null }
    comments?: Array<{ __typename?: 'Comment'; content: string; userID: string } | null> | null
  }
}

export type FindUserQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type FindUserQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    name: string
    image?: string | null
    assessment?: number | null
    id: string
    ShopItem?: Array<{
      __typename?: 'ShopItem'
      id: string
      title: string
      image: string
      price: number
    }> | null
  } | null
}

export type FindUserWithMailQueryVariables = Exact<{
  mail: Scalars['String']
  password: Scalars['String']
}>

export type FindUserWithMailQuery = {
  __typename?: 'Query'
  userWithMail?: {
    __typename?: 'User'
    password: string
    mail: string
    name: string
    image?: string | null
    id: string
  } | null
}

export type CreateUserMutationVariables = Exact<{
  mail: Scalars['String']
  password: Scalars['String']
}>

export type CreateUserMutation = {
  __typename?: 'Mutation'
  createUser: { __typename?: 'User'; id: string; mail: string; password: string }
}

export type CreateShopItemMutationVariables = Exact<{
  title: Scalars['String']
  description?: InputMaybe<Scalars['String']>
  image?: InputMaybe<Scalars['String']>
  price: Scalars['Int']
  isContainDelivery: Scalars['Boolean']
  userID: Scalars['String']
}>

export type CreateShopItemMutation = {
  __typename?: 'Mutation'
  createShopItem?: {
    __typename?: 'ShopItem'
    title: string
    description?: string | null
    price: number
    image: string
    user: { __typename?: 'User'; id: string; name: string }
  } | null
}

export type AppendNameForCreatedUserMutationVariables = Exact<{
  image: Scalars['String']
  name: Scalars['String']
  userID: Scalars['String']
}>

export type AppendNameForCreatedUserMutation = {
  __typename?: 'Mutation'
  appendNameForCreatedUser: { __typename?: 'User'; id: string }
}

export type FollowingQueryVariables = Exact<{
  userId: Scalars['ID']
}>

export type FollowingQuery = {
  __typename?: 'Query'
  following: Array<{
    __typename?: 'Follower'
    id: string
    targetUserID: string
    targetUser: Array<{ __typename?: 'User'; name: string; id: string }>
  } | null>
}

export type FollowersQueryVariables = Exact<{
  targetUserId: Scalars['ID']
}>

export type FollowersQuery = {
  __typename?: 'Query'
  followers: Array<{
    __typename?: 'Follower'
    targetUser: Array<{ __typename?: 'User'; id: string; name: string }>
  } | null>
}

export type FollowMutationVariables = Exact<{
  userId: Scalars['ID']
  targetUserId: Scalars['ID']
}>

export type FollowMutation = {
  __typename?: 'Mutation'
  follow: { __typename?: 'Follower'; id: string }
}

export type UnFollowMutationVariables = Exact<{
  userId: Scalars['ID']
  targetUserId: Scalars['ID']
}>

export type UnFollowMutation = { __typename?: 'Mutation'; unfollow: boolean }

export const ItemFragmentFragmentDoc = gql`
  fragment ItemFragment on ShopItem {
    id
    title
    description
    image
    good
    price
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
export const UserIDsDocument = gql`
  query UserIDs {
    users {
      id
    }
  }
`
export const ShopItemsTopDocument = gql`
  query ShopItemsTop {
    items {
      id
      title
      price
      image
    }
  }
`
export const ShopItemIDsDocument = gql`
  query ShopItemIDs {
    items {
      id
    }
  }
`
export const FindItemDocument = gql`
  query FindItem($id: ID!) {
    item(id: $id) {
      ...ItemFragment
      user {
        id
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
export const FindUserDocument = gql`
  query FindUser($id: ID!) {
    user(id: $id) {
      name
      image
      assessment
      id
      ShopItem {
        id
        title
        image
        price
      }
    }
  }
`
export const FindUserWithMailDocument = gql`
  query FindUserWithMail($mail: String!, $password: String!) {
    userWithMail(mail: $mail, password: $password) {
      password
      mail
      name
      image
      id
    }
  }
`
export const CreateUserDocument = gql`
  mutation CreateUser($mail: String!, $password: String!) {
    createUser(mail: $mail, password: $password) {
      id
      mail
      password
    }
  }
`
export const CreateShopItemDocument = gql`
  mutation CreateShopItem(
    $title: String!
    $description: String
    $image: String
    $price: Int!
    $isContainDelivery: Boolean!
    $userID: String!
  ) {
    createShopItem(
      title: $title
      description: $description
      image: $image
      price: $price
      isContainDelivery: $isContainDelivery
      userID: $userID
    ) {
      title
      description
      price
      image
      user {
        id
        name
      }
    }
  }
`
export const AppendNameForCreatedUserDocument = gql`
  mutation AppendNameForCreatedUser($image: String!, $name: String!, $userID: String!) {
    appendNameForCreatedUser(image: $image, name: $name, userID: $userID) {
      id
    }
  }
`
export const FollowingDocument = gql`
  query Following($userId: ID!) {
    following(userId: $userId) {
      id
      targetUserID
      targetUser {
        name
        id
      }
    }
  }
`
export const FollowersDocument = gql`
  query Followers($targetUserId: ID!) {
    followers(targetUserId: $targetUserId) {
      targetUser {
        id
        name
      }
    }
  }
`
export const FollowDocument = gql`
  mutation Follow($userId: ID!, $targetUserId: ID!) {
    follow(userId: $userId, targetUserId: $targetUserId) {
      id
    }
  }
`
export const UnFollowDocument = gql`
  mutation UnFollow($userId: ID!, $targetUserId: ID!) {
    unfollow(userId: $userId, targetUserId: $targetUserId)
  }
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
    UserIDs(
      variables?: UserIDsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UserIDsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UserIDsQuery>(UserIDsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UserIDs',
        'query',
      )
    },
    ShopItemsTop(
      variables?: ShopItemsTopQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<ShopItemsTopQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ShopItemsTopQuery>(ShopItemsTopDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'ShopItemsTop',
        'query',
      )
    },
    ShopItemIDs(
      variables?: ShopItemIDsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<ShopItemIDsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ShopItemIDsQuery>(ShopItemIDsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'ShopItemIDs',
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
    FindUser(
      variables: FindUserQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<FindUserQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindUserQuery>(FindUserDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'FindUser',
        'query',
      )
    },
    FindUserWithMail(
      variables: FindUserWithMailQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<FindUserWithMailQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindUserWithMailQuery>(FindUserWithMailDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'FindUserWithMail',
        'query',
      )
    },
    CreateUser(
      variables: CreateUserMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateUserMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateUserMutation>(CreateUserDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreateUser',
        'mutation',
      )
    },
    CreateShopItem(
      variables: CreateShopItemMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateShopItemMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateShopItemMutation>(CreateShopItemDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreateShopItem',
        'mutation',
      )
    },
    AppendNameForCreatedUser(
      variables: AppendNameForCreatedUserMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<AppendNameForCreatedUserMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AppendNameForCreatedUserMutation>(
            AppendNameForCreatedUserDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'AppendNameForCreatedUser',
        'mutation',
      )
    },
    Following(
      variables: FollowingQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<FollowingQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FollowingQuery>(FollowingDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Following',
        'query',
      )
    },
    Followers(
      variables: FollowersQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<FollowersQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FollowersQuery>(FollowersDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Followers',
        'query',
      )
    },
    Follow(
      variables: FollowMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<FollowMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FollowMutation>(FollowDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Follow',
        'mutation',
      )
    },
    UnFollow(
      variables: UnFollowMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UnFollowMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UnFollowMutation>(UnFollowDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UnFollow',
        'mutation',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
