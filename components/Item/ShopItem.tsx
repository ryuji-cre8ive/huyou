import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Box } from '@mui/material'

interface Props {
  id: string
  title: string
  image: string
  price: number
}

const ShopItem: React.FC<Props> = ({ id, title, image, price }) => {
  return (
    <>
      <Link href={`/items/[id]`} as={`/items/${id}`}>
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
            ￥{price}
          </Box>
        </Box>
        <Box>{title}</Box>
      </Link>
    </>
  )
}

export default ShopItem
