import { executeQuery } from './graphql'

export const getFollowings = async (userId: string) => {
  const followings = await executeQuery('Following', { userId })
  console.log('getFollowings: ', followings)
  return followings
}
