import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
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
  appendNameForCreatedUser: User
  createComment: Comment
  createShopItem?: Maybe<ShopItem>
  createUser: User
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
  item: ShopItem
  items: Array<ShopItem>
  user?: Maybe<User>
  userWithMail?: Maybe<User>
  users: Array<User>
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

export function useFetchUserQuery(
  options?: Omit<Urql.UseQueryArgs<FetchUserQueryVariables>, 'query'>,
) {
  return Urql.useQuery<FetchUserQuery, FetchUserQueryVariables>({
    query: FetchUserDocument,
    ...options,
  })
}
export const UserIDsDocument = gql`
  query UserIDs {
    users {
      id
    }
  }
`

export function useUserIDsQuery(options?: Omit<Urql.UseQueryArgs<UserIDsQueryVariables>, 'query'>) {
  return Urql.useQuery<UserIDsQuery, UserIDsQueryVariables>({ query: UserIDsDocument, ...options })
}
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

export function useShopItemsTopQuery(
  options?: Omit<Urql.UseQueryArgs<ShopItemsTopQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ShopItemsTopQuery, ShopItemsTopQueryVariables>({
    query: ShopItemsTopDocument,
    ...options,
  })
}
export const ShopItemIDsDocument = gql`
  query ShopItemIDs {
    items {
      id
    }
  }
`

export function useShopItemIDsQuery(
  options?: Omit<Urql.UseQueryArgs<ShopItemIDsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ShopItemIDsQuery, ShopItemIDsQueryVariables>({
    query: ShopItemIDsDocument,
    ...options,
  })
}
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

export function useFindItemQuery(
  options: Omit<Urql.UseQueryArgs<FindItemQueryVariables>, 'query'>,
) {
  return Urql.useQuery<FindItemQuery, FindItemQueryVariables>({
    query: FindItemDocument,
    ...options,
  })
}
export const FindUserDocument = gql`
  query FindUser($id: ID!) {
    user(id: $id) {
      name
      image
      assessment
      ShopItem {
        id
        title
        image
        price
      }
    }
  }
`

export function useFindUserQuery(
  options: Omit<Urql.UseQueryArgs<FindUserQueryVariables>, 'query'>,
) {
  return Urql.useQuery<FindUserQuery, FindUserQueryVariables>({
    query: FindUserDocument,
    ...options,
  })
}
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

export function useFindUserWithMailQuery(
  options: Omit<Urql.UseQueryArgs<FindUserWithMailQueryVariables>, 'query'>,
) {
  return Urql.useQuery<FindUserWithMailQuery, FindUserWithMailQueryVariables>({
    query: FindUserWithMailDocument,
    ...options,
  })
}
export const CreateUserDocument = gql`
  mutation CreateUser($mail: String!, $password: String!) {
    createUser(mail: $mail, password: $password) {
      id
      mail
      password
    }
  }
`

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument)
}
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

export function useCreateShopItemMutation() {
  return Urql.useMutation<CreateShopItemMutation, CreateShopItemMutationVariables>(
    CreateShopItemDocument,
  )
}
export const AppendNameForCreatedUserDocument = gql`
  mutation AppendNameForCreatedUser($image: String!, $name: String!, $userID: String!) {
    appendNameForCreatedUser(image: $image, name: $name, userID: $userID) {
      id
    }
  }
`

export function useAppendNameForCreatedUserMutation() {
  return Urql.useMutation<
    AppendNameForCreatedUserMutation,
    AppendNameForCreatedUserMutationVariables
  >(AppendNameForCreatedUserDocument)
}
