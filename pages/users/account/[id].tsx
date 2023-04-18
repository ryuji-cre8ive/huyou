import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { executeQuery } from 'lib/graphql'
import { UserIDsQuery, FindUserQuery, AppendNameForCreatedUserMutation } from '~/generated/server'
import type { User } from '~/generated/graphql'
import { Box, Rating, Button, Container, Typography, Grid, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useState, ChangeEvent, FormEvent } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import router from 'next/router'
import NameAndImageView from '~/components/account/NameAndImageView'
import AccountProhibition from '~/components/account/AccountProhibition'

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

export const UserAccountPage: NextPage<Params> = ({ user }) => {
  const { data: session } = useSession()

  if (!user) return <p>error</p>
  if (session?.user.id !== user.id) {
    return <AccountProhibition />
  }
  if (user.name === '')
    return (
      <>
        <NameAndImageView message='初期登録を行なってください' />
      </>
    )
  return (
    <>
      this is user account page for {user.name}
      <NameAndImageView message='変更する場合は書き換えてください' />
    </>
  )
}
export default UserAccountPage
