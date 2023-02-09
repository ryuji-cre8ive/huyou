import { createClient } from 'urql'
import { GraphQLClient } from 'graphql-request'
import { getSdk } from '~/generated/server'

export const client = createClient({
  url: process.env.GO_GRAPHQL_BASE_URL || 'http://localhost:8080/query',
})

export const getDataWithQuery = async <T>(query: String, arg?: T, limit?: Number): Promise<any> => {
  let data
  const server = new GraphQLClient(process.env.GO_GRAPH_SERVER || 'http://localhost:8080/query')
  const sdk = getSdk(server)
  if (query == 'FetchUser') {
    data = await sdk.FetchUser()
  } else if (query == 'FindItem') {
    data = await sdk.FindItem({ id: String(arg) })
  } else if (query == 'ShopItemIDs') {
    data = await sdk.ShopItemIDs()
  } else if (query == 'ShopItemTop') {
    data = await sdk.ShopItemsTop()
  } else if (query == 'UserIDs') {
    data = await sdk.UserIDs()
  } else if (query == 'FindUser') {
    data = await sdk.FindUser({ id: String(arg) })
  } else {
    data = await sdk.FetchUser()
    alert('you are wrong args...')
  }
  return data
}
