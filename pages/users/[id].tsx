import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import React, { useEffect, useState } from 'react'
import { executeQuery } from 'lib/graphql'
import { UserIDsQuery, FindUserQuery } from '~/generated/server'
import type { User } from '~/generated/graphql'
import { Box, Container, Typography } from '@mui/material'
import Contents from '~/components/Item/Contents'
import { useSession } from 'next-auth/react'
import { getImageFromGcs } from 'lib/image'
import Follow from '~/components/account/Follow'
import ProfileTop from '~/components/account/ProfileTop'
import Snackbar from '@mui/material/Snackbar';


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
  // const [followings, setFollowings] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [open, setOpen] = useState<boolean>(false);

  const isMyself = session?.user.id === user?.id
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleFollowToggle = async () => {
    setOpen(true)
    const params = {
      userId: session?.user.id,
      targetUserId: user.id,
    }
    setIsFollow(!isFollow)
    try {
      await executeQuery('UnFollow', params)
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
    console.log(0)
    if (session?.user) {
      
      const checkIsFollower = async () => {
        const res = await executeQuery('Following', { userId: session?.user.id })
        console.log('following', res.following)
        // setFollowings(res.following)

        if (res.following) {
          const result = res.following.some((item: any) => item.targetUserID === user?.id)
          if (result) {
            setIsFollow(true)
          }
        }
        setIsLoading(false)
      }
      checkIsFollower()
    }
  }, [session?.user, user?.id])

  if (!user) return <p>error</p>
  return (
    <>
      <ProfileTop
        user={user}
        handleFollow={handleFollowToggle}
        handleUnFollow={handleFollowToggle}
        image={image}
        isMyself={isMyself}
        isFollow={isFollow}
        isLoading={isLoading}
      />
      <Snackbar open={open} onClose={handleClose} autoHideDuration={3000} message={(isFollow ? 'フォロー' : 'フォロー解除') + 'しました'}></Snackbar>
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
