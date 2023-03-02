import { createClient } from 'urql'
import { GraphQLClient } from 'graphql-request'
import { getSdk } from '~/generated/server'

export const client = createClient({
  url: String(process.env.Server),
})

type QueryType = "FetchUser" | "FindItem" | "ShopItemIDs" | "ShopItemsTop" | "UserIDs" | "FindUser";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const executeQuery = async (query: QueryType, variables: any = {}, delay = 10): Promise<any> => {

  const client = new GraphQLClient(String(process.env.Server))
  const sdk = getSdk(client)
  const data = await sdk[query](variables)
  console.log("dddddddd", data)
  if (!data) {
    return alert("error")
  }
  if (delay) {
    await sleep(delay);
  }
  return data
}