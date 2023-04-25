import { Box, Button, Rating, Skeleton } from '@mui/material'
import NextImage from 'next/image'
import { User } from '~/generated/graphql'

interface Props {
  user: User
  handleUnFollow: () => void
  handleFollow: () => void
  image: string | null | undefined
  isMyself: boolean
  isFollow: boolean
  isLoading: boolean
}

const ProfileTop = ({
  user,
  handleFollow,
  handleUnFollow,
  image,
  isMyself,
  isFollow,
  isLoading,
}: Props) => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '50px' }}>
        <Box
          sx={{
            position: 'relative',
            width: { xs: '30px', sm: '80px' },
            height: { xs: '30px', sm: '80px' },
          }}
        >
          {image === undefined ? (
            <Skeleton variant='circular' width={80} height={80} />
          ) : image ? (
            <NextImage
              src={String(image)}
              alt='user image'
              fill
              sizes='(min-width: 30px) 80px, 100px'
              style={{ margin: '0 5%', backgroundColor: '#000', borderRadius: '50%' }}
            />
          ) : (
            <p>pepepepe</p>
          )}
        </Box>
        <Box sx={{ margin: '10px 20px' }}>
          <p style={{ margin: '0' }}>{user.name}</p>
          <Rating readOnly value={user.assessment} size='small'></Rating>
        </Box>
        {isLoading ? (
          <Skeleton variant='rounded' width={100} height={50} sx={{ marginTop: '10px' }} />
        ) : isMyself ? (
          <Button disabled>自分自身です</Button>
        ) : isFollow ? (
          <Button
            variant='outlined'
            color='error'
            size='small'
            sx={{ margin: '20px 0' }}
            onClick={handleUnFollow}
          >
            フォロー解除
          </Button>
        ) : (
          <Button
            variant='outlined'
            color='primary'
            size='small'
            sx={{ margin: '20px 0' }}
            onClick={handleFollow}
          >
            フォロー
          </Button>
        )}
      </Box>
    </>
  )
}

export default ProfileTop
