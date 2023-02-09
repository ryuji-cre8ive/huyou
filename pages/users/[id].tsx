import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { getDataWithQuery } from 'lib/graphql'
import { GraphQLClient } from 'graphql-request'
import { getSdk, UserIDsQuery, FindUserQuery } from '~/generated/server'
import { User } from '~/generated/graphql'
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
      <h1>this is {user.name} user page</h1>
    </>
  )
}

export default UserPage
