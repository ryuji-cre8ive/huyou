import React from 'react'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { shopItemMock } from '../../tmpShopItem'
import { ShopItemType } from 'interface/shop'
import NextImage from 'next/image'
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

interface Params {
  item: ShopItemType
}

const ItemPage: NextPage<Params> = ({ item }) => {
  if (!item) return <h1>Error</h1>
  return (
    <>
      <NextImage src='/vercel.svg' alt='image' width={300} height={300} />
      <p>{item.title}</p>
      <p>{item.prise}</p>
    </>
  )
}

export default ItemPage
