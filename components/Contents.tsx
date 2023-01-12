import React from 'react'
import { Grid } from '@mui/material'
import ShopItem from '~/components/ShopItem'

import { shopItemMock } from '../tmpShopItem'
import { ShopItemType } from '../interface/shop'

const Contents: React.FC = () => {
  return (
    <Grid container spacing={{ xs: 1, md: 5 }}>
      {shopItemMock.map((item: ShopItemType, i: number) => {
        return (
          <Grid key={i} item xs={6} sm={4} md={2.3}>
            <ShopItem id={item.id} title={item.title} imageURL={item.imageURL} prise={item.prise} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default Contents
