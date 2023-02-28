import React from 'react'
import { Grid } from '@mui/material'
import ShopItem from '~/components/Item/ShopItem'
import type { Maybe } from 'graphql/jsutils/Maybe'

// import { ShopItem as ShopItemType } from '../../interface/shop'
import type { ShopItem as ShopItemType } from '~/generated/graphql'
interface Props {
  shopItem: ShopItemType[]
}

const Contents: React.FC<Props> = ({ shopItem }) => {
  if (!shopItem) return <p>shopItem is none</p>
  return (
    <Grid container spacing={{ xs: 1, md: 5 }}>
      {shopItem.map((item: ShopItemType, i: number) => {
        return (
          <Grid key={i} item xs={6} sm={4} md={2.3}>
            <ShopItem id={item.id} title={item.title} image={item.image} prise={item.prise} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default Contents
