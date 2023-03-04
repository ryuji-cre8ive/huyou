import React from 'react'
import { Button } from '@mui/material'
import { useSession, signIn, signOut } from 'next-auth/react'

const LogoutButton: React.FC = () => {
  return (
    <>
      <Button
        color='error'
        variant='contained'
        sx={{ whiteSpace: 'nowrap' }}
        size='small'
        onClick={() => signOut()}
      >
        ログアウト
      </Button>
    </>
  )
}

export default LogoutButton
