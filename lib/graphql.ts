import { createClient } from 'urql'
import { GraphQLClient } from 'graphql-request'
import { getSdk } from '~/generated/server'

export const client = createClient({
  url: String(process.env.Server),
})

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getDataWithQuery = async <T>(query: String, arg?: T): Promise<any> => {
  let data
  const limit = 10
  const server = new GraphQLClient(String(process.env.Server))
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
  const delay = limit ? Math.ceil(1000 / limit) : 0;
  if (delay) {
    await sleep(delay);
  }

  return data
}
