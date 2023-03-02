import React from 'react'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { shopItemMock } from '../../tmpShopItem'
import { ShopItem } from 'interface/shop'
import NextImage from 'next/image'
import { Box, IconButton, Rating, Typography } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import { FavoriteBorder, ChatBubbleOutline } from '@mui/icons-material'
import BuyButton from '~/components/Item/BuyButton'
import Link from 'next/link'
import { useQuery } from 'urql'
import { executeQuery } from 'lib/graphql'

import { GraphQLClient } from 'graphql-request'
import { getSdk } from '~/generated/server'
interface PathParams {
  id: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await executeQuery('ShopItemIDs')
  const paths = data.items.map((item: PathParams) => ({
    params: {
      id: item.id,
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
      props: { item: {} },
    }
    const data = await executeQuery("FindItem", {
      id: String(params.id),
    })
  console.log('item', data.item)
  return {
    props: { item: data.item },
    revalidate: 1, // このページに変更があった場合にビルドやるよ
    notFound: !data,
  }
}

const ShopItemTitle = styled('div')(({ theme }) => ({
  fontSize: 30,
  fontWeight: 'bold',
}))

const ShopItemPrise = styled('div')(({ theme }) => ({
  fontSize: 26,
}))

const IsTaxSendfeeInclude = styled('div')(({ theme }) => ({
  color: '#999',
}))

const SellerName = styled('div')(({ theme }) => ({
  color: '#000',
  fontSize: '16',
  fontWeight: 'bold',
}))

interface Params {
  item: ShopItem
}

const ItemPage: NextPage<Params> = ({ item }) => {
  if (!item) return <h1>Error</h1>
  return (
    <>
      <Box sx={{ margin: '5%' }}>
        <Box
          sx={{
            display: { xs: 'block', sm: 'flex' },
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: { xs: '300px', sm: '500px' },
              height: { xs: '300px', sm: '500px' },
              margin: { xs: '0', sm: '5%' },
              position: 'relative',
            }}
          >
            <NextImage
              src='/vercel.svg'
              alt='image'
              fill
              style={{ margin: '0 5%', backgroundColor: '#000' }}
            />
          </Box>

          <Box sx={{ width: { sx: '100%', sm: 500 }, marginTop: { xs: '20px', sm: '100px' } }}>
            <ShopItemTitle>{item.title}</ShopItemTitle>
            <Box sx={{ display: 'flex' }}>
              <ShopItemPrise>￥{item.prise}</ShopItemPrise>
              <IsTaxSendfeeInclude>(税込)送料込み</IsTaxSendfeeInclude>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <IconButton>
                <FavoriteBorder></FavoriteBorder>
              </IconButton>
              いいね
              <IconButton>
                <ChatBubbleOutline></ChatBubbleOutline>
              </IconButton>
              コメント
            </Box>
            <Box sx={{ margin: '10px 30px' }}>
              <BuyButton />
            </Box>
            <Box>
              <Typography
                variant='h6'
                component={'h3'}
                sx={{ fontSize: '18px', fontWeight: 'bold', margin: '20px 0' }}
              >
                商品詳細
              </Typography>
              <Box sx={{ backgroundColor: '#EAC7C7', padding: '5%', borderRadius: '10px' }}>
                {item.description ? item.description : '説明文がありません'}
              </Box>
            </Box>
            <Typography
              variant='h6'
              component={'h3'}
              sx={{ fontSize: '18px', fontWeight: 'bold', margin: '20px 0' }}
            >
              出品者
            </Typography>
            <Link href={`/users/${item.user.id}`}>
              <Box
                sx={{
                  display: 'flex',
                  margin: '10px',
                  padding: '20px',
                  borderTop: 'solid #ECECEC',
                  borderBottom: 'solid #ECECEC',
                }}
              >
                <Box
                  sx={{ backgroundColor: 'pink', borderRadius: '50%' }}
                  width={50}
                  height={50}
                ></Box>
                <Box sx={{ marginLeft: '10px' }}>
                  <SellerName>{item.user.name}</SellerName>
                  <Rating defaultValue={item.user.assessment} readOnly size='small' />
                </Box>
              </Box>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default ItemPage
