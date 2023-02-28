import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { getDataWithQuery } from 'lib/graphql'
import { GraphQLClient } from 'graphql-request'
import { getSdk, UserIDsQuery, FindUserQuery } from '~/generated/server'
import type { User } from '~/generated/graphql'
import { Box, Rating, Button } from '@mui/material'
import NextImage from 'next/image'

export const getStaticPaths: GetStaticPaths = async () => {
  const data: UserIDsQuery = await getDataWithQuery('UserIDs')
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
  const data: FindUserQuery = await getDataWithQuery('FindUser', params.id)
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
  return (
    <>
      <Box sx={{display: 'flex'}}>
        <Box sx={{position: 'relative', width: { xs: '50px', sm: '100px' },
              height: { xs: '50px', sm: '100px' },}}>
          <NextImage src={user.image ? user.image : '/vercel.svg'} alt='user image' fill style={{ margin: '0 5%', backgroundColor: '#000', borderRadius: '50%' }}/>
        </Box>
        <Box sx={{margin: '0 20px'}}>
          <p style={{margin: '0'}}>{user.name}</p>
          <Rating readOnly value={user.assessment} size='small'></Rating>
        </Box>
        <Button variant='outlined' color='error' size='small'>フォロー</Button>
      </Box>
    </>
  )
}

export default UserPage
