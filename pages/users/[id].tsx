import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import React, { useEffect, useState } from 'react'
import { executeQuery } from 'lib/graphql'
import { UserIDsQuery, FindUserQuery } from '~/generated/server'
import type { User } from '~/generated/graphql'
import { Box, Rating, Button, Container, Typography } from '@mui/material'
import NextImage from 'next/image'
import Contents from '~/components/Item/Contents'
import { useSession } from 'next-auth/react'
import { getImageFromGcs } from 'lib/image'
import Following from '~/components/account/Follow'
import Follow from '~/components/account/Follow'
import ProfileTop from '~/components/account/ProfileTop'

export const getStaticPaths: GetStaticPaths = async () => {
  const data: UserIDsQuery = await executeQuery('UserIDs')
  const paths = data.users.map((user) => ({
    params: {
      id: String(user.id),
    },
  }))
  return {
    paths,
    fallback: true, // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.id)
    return {
      props: { user: {} },
    }
  const data: FindUserQuery = await executeQuery('FindUser', { id: String(params.id) })
  console.log('user', data.user)
  return {
    props: { user: data.user },
    revalidate: 1, // このページに変更があった場合にビルドやるよ
    notFound: !data,
  }
}

interface Params {
  user: User
}

export const UserPage: NextPage<Params> = ({ user }) => {
  const { data: session } = useSession()
  const [image, setImage] = useState<string | null>()
  const [isFollow, setIsFollow] = useState(false)
  const [isMyself, setIsMyself] = useState<boolean>(false)
  const [followings, setFollowings] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const handleFollow = async () => {
    const params = {
      userId: session?.user.id,
      targetUserId: user.id,
    }
    const res = await executeQuery('Follow', params)
    console.log(res)
  }

  const handleUnFollow = async () => {
    console.log('フォロー解除します')
    const params = {
      userId: session?.user.id,
      targetUserId: user.id,
    }
    try {
      await executeQuery('UnFollow', params)
      setIsFollow(false)
    } catch (e) {
      console.log('error: ', e)
    }
  }
  useEffect(() => {
    const getImage = async () => {
      if (user) {
        if (user.image) {
          const imageURL = await getImageFromGcs(String(user.image))
          setImage(imageURL)
        } else {
          setImage(null)
        }
      }
    }
    getImage()
  }, [user])
  useEffect(() => {
    setIsLoading(true)
    if (session?.user) {
      if (session?.user.id === user.id) {
        setIsMyself(true)
        setIsLoading(false)
        return
      }
      const checkIsFollower = async () => {
        const res = await executeQuery('Following', { userId: session?.user.id })
        setFollowings(res.following)
        const result = res.following.some((item: any) => item.targetUserID === user.id)
        if (result) {
          setIsFollow(true)
        }
        setIsLoading(false)
      }
      checkIsFollower()
    }
  }, [session?.user])

  if (!user) return <p>error</p>
  return (
    <>
      <ProfileTop
        user={user}
        handleFollow={handleFollow}
        handleUnFollow={handleUnFollow}
        image={image}
        isMyself={isMyself}
        isFollow={isFollow}
        isLoading={isLoading}
      />
      <Box textAlign='center'>
        <Follow user={user} />
      </Box>
      {user.ShopItem && (
        <Container sx={{ textAlign: 'center' }}>
          <Typography
            variant='h4'
            noWrap
            align='left'
            component='h2'
            sx={{
              margin: '10px 0',
            }}
          >
            {user.name}さんの商品一覧
          </Typography>
          <Contents shopItem={user.ShopItem} />
        </Container>
      )}
    </>
  )
}

export default UserPage
