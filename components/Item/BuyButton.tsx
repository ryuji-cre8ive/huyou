import React from 'react'
import { Button } from '@mui/material'

const BuyButton: React.FC = () => {
  return (
    <>
      <Button color='error' variant='contained' fullWidth>
        商品を購入する
      </Button>
    </>
  )
}

export default BuyButton
