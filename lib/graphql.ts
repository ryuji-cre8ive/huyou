import { createClient } from 'urql'
export const client = createClient({
  url: process.env.GO_GRAPHQL_BASE_URL || "",
})