import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { executeQuery } from 'lib/graphql'
import { UserIDsQuery, FindUserQuery } from '~/generated/server'
import type { User } from '~/generated/graphql'
import { Box, Rating, Button, Container, Typography } from '@mui/material'
import NextImage from 'next/image'
import Contents from '~/components/Item/Contents'

export const getStaticPaths: GetStaticPaths = async () => {
  const data: UserIDsQuery = await executeQuery('UserIDs')
  const paths = data.users.map((user) => ({
    params: {
      id: user.id,
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
  if (!user) return <p>error</p>
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '50px' }}>
        <Box
          sx={{
            position: 'relative',
            width: { xs: '30px', sm: '80px' },
            height: { xs: '30px', sm: '80px' },
          }}
        >
          {user.image ? (
            <NextImage
              src={String(user.image)}
              alt='user image'
              fill
              style={{ margin: '0 5%', backgroundColor: '#000', borderRadius: '50%' }}
            />
          ) : (
            <NextImage
              src='/vercel.svg'
              alt='user image'
              fill
              style={{ margin: '0 5%', backgroundColor: '#000', borderRadius: '50%' }}
            />
          )}
        </Box>
        <Box sx={{ margin: '10px 20px' }}>
          <p style={{ margin: '0' }}>{user.name}</p>
          <Rating readOnly value={user.assessment} size='small'></Rating>
        </Box>
        <Button variant='outlined' color='error' size='small' sx={{ margin: '20px 0' }}>
          フォロー
        </Button>
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
