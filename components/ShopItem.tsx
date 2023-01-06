import React from 'react'
import NextImage from 'next/image'
import Link from 'next/link'

import { ShopItemType } from '../interface/shop'

const ShopItem: React.FC<ShopItemType> = ({ id, title, imageURL, prise }) => {
  return (
    <>
      <Link href={`/items/${id}`}>
        <NextImage src='/vercel.svg' alt='image' width={300} height={300} />
        <p>{title}</p>
        <p>{prise}</p>
      </Link>
    </>
  )
}

export default ShopItem
