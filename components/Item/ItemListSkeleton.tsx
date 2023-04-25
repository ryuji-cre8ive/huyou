import ItemSkeleton from './ItemSkeleton'
import { Grid } from '@mui/material'
const ItemListSkeleton = () => {
  return (
    <>
      <Grid container spacing={{ xs: 1, md: 5 }}>
        {Array.from({ length: 10 }).map((_, index) => (
          <Grid key={index} item xs={6} sm={4} md={2.3}>
            <ItemSkeleton key={index} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default ItemListSkeleton
