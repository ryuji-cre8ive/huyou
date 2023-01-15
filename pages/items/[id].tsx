import React from 'react'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { shopItemMock } from '../../tmpShopItem'
import { ShopItemType } from 'interface/shop'
import NextImage from 'next/image'
import { Box, IconButton, Rating } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import { FavoriteBorder, ChatBubbleOutline } from '@mui/icons-material'
import BuyButton from '~/components/Item/BuyButton'
import Link from 'next/link'
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
  color: '#999',
}))

const SellerName = styled('div')(({ theme }) => ({
  color: '#000',
  fontSize: '16',
  fontWeight: 'bold',
}))

interface Params {
  item: ShopItemType
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
          <Box sx={{ width: { xs: '300px', sm: '500px' }, height: { xs: '300px', sm: '500px' } }}>
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
              <h4>商品詳細</h4>
              <Box sx={{ backgroundColor: '#EAC7C7', padding: '5%', borderRadius: '10px' }}>
                商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。
              </Box>
            </Box>
            <Link href='/'>
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
                <Box>
                  <SellerName>佐藤しお</SellerName>
                  <Rating defaultValue={2.5} readOnly size='small' />
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
