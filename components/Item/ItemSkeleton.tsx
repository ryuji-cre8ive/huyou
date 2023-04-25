import { Box, Skeleton } from '@mui/material'
const ItemSkeleton = () => {
  return (
    <>
      <Box>
        <Skeleton
          variant='rectangular'
          sx={{
            width: { xs: '175px', md: '222px' },
            height: { xs: '175px', md: '222px' },
            position: 'relative',
            margin: '0 auto',
          }}
        />
        <Skeleton
          variant='text'
          sx={{
            width: { xs: '175px', md: '222px' },
            height: { xs: '30px', md: '30px' },
            position: 'relative',
            margin: '0 auto',
          }}
        />
      </Box>
    </>
  )
}

export default ItemSkeleton
