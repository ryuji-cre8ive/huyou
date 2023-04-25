import { getFollowings } from 'lib/follow'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { User } from '~/generated/server'
import { Skeleton, Box } from '@mui/material'

interface FollowingProps {
  user: User
}

interface Followings {
  id: string
  targetUserID: string
}

const Follow = ({ user }: FollowingProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [followings, setFollowings] = useState<Followings[]>([])

  useEffect(() => {
    const fetchFollowings = async () => {
      setIsLoading(true)
      if (user) {
        const res = await getFollowings(user.id)
        setFollowings(res.following)
      }
      setIsLoading(false) // fetch 完了後に loading ステートを更新する
    }
    fetchFollowings()
  }, [user?.id])

  return (
    <>
      <Box sx={{ textAlign: 'center', justifyContent: 'center' }}>
        {isLoading ? (
          <Skeleton
            animation='wave'
            variant='text'
            width={100}
            height={30}
            sx={{ margin: '0 auto' }}
          />
        ) : (
          <Link href={'/users/' + user.id + '/follow'}>フォロー: {followings.length ?? 0}</Link>
        )}
      </Box>
    </>
  )
}

export default Follow
