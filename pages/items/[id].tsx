import React from 'react'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { shopItemMock } from '../../tmpShopItem'
import { ShopItemType } from 'interface/shop'
import NextImage from 'next/image'
import { Box, IconButton } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import {
  FavoriteBorder,
  ChatBubbleOutline
} from '@mui/icons-material'
// interface PathParams {
//   id: number
// }

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = shopItemMock.map((item: { id: string }) => ({
    params: { id: item.id },
  }))
  return {
    paths,
    fallback: true, // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params)
    return {
      props: { item: {} },
    }
  const item = shopItemMock[Number(params.id) - 1]
  return {
    props: { item },
    revalidate: 1, // このページに変更があった場合にビルドやるよ
    notFound: !item,
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
  color: '#999'
}))

interface Params {
  item: ShopItemType
}

const ItemPage: NextPage<Params> = ({ item }) => {
  if (!item) return <h1>Error</h1>
  return (
    <>
    <Box sx={{}}>
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <NextImage src='/vercel.svg' alt='image' width={500} height={500} style={{margin: '3% 5%', backgroundColor: '#000'}}/>
        <Box sx={{width: 700}}>
          <ShopItemTitle>{item.title}</ShopItemTitle>
          <Box sx={{display: 'flex'}}>
            <ShopItemPrise>￥{item.prise}</ShopItemPrise>
            <IsTaxSendfeeInclude>(税込)送料込み</IsTaxSendfeeInclude>
          </Box>
          <Box sx={{display: 'flex'}}>
            <IconButton>
              <FavoriteBorder></FavoriteBorder>
            </IconButton>
            いいね
            <IconButton>
              <ChatBubbleOutline></ChatBubbleOutline>
            </IconButton>
            コメント
          </Box>
          <Box>
            <h4>商品詳細</h4>
            <Box sx={{backgroundColor: '#909090', padding: '5%', borderRadius: '10px'}}>
              商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。
            </Box>
          </Box>
          
        </Box>
      </Box>
    </Box>
      
      
    </>
  )
}

export default ItemPage
