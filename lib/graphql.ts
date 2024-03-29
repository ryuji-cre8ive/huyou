import { createClient } from 'urql'
import { GraphQLClient } from 'graphql-request'
import { getSdk } from '~/generated/server'

export const client = createClient({
  url: String(process.env.Server),
})

type QueryType =
  | 'FetchUser'
  | 'FindItem'
  | 'ShopItemIDs'
  | 'ShopItemsTop'
  | 'UserIDs'
  | 'FindUser'
  | 'FindUserWithMail'
  | 'Following'
  | 'Followers'

type MutationType =
  | 'CreateUser'
  | 'CreateShopItem'
  | 'AppendNameForCreatedUser'
  | 'Follow'
  | 'UnFollow'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const executeQuery = async (
  query: QueryType | MutationType,
  variables: any = {},
  delay = 30,
): Promise<any> => {
  const client = new GraphQLClient(String(process.env.Server))
  const sdk = getSdk(client)
  const data = await sdk[query](variables)
  if (!data) {
    return alert('error')
  }
  if (delay) {
    await sleep(delay)
  }
  return data
}
