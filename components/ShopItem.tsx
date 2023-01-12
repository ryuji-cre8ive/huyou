import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Box } from '@mui/material'

import { ShopItemType } from '../interface/shop'

const ShopItem: React.FC<ShopItemType> = ({ id, title, imageURL, prise }) => {
  return (
    <>
      <Link href={`/items/${id}`}>
        <Box
          sx={{
            position: 'relative',
            margin: '0 auto',
            width: { xs: '175px', md: '222px' },
            height: { xs: '175px', md: '222px' },
            backgroundColor: '#000',
          }}
        >
          <Image src='/vercel.svg' alt='image' layout='fill' />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 10,
              background: '#CCCCCC',
              color: 'white',
              padding: 1,
              borderRadius: 30,
            }}
          >
            ￥{prise}
          </Box>
        </Box>
        <Box>{title}</Box>
      </Link>
    </>
  )
}

export default ShopItem
