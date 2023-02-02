import React from 'react'
import { Button } from '@mui/material'
import { useSession, signIn, signOut } from "next-auth/react"

const LoginButton: React.FC = () => {
  return (
    <>
      <Button color='success' variant='contained' sx={{ whiteSpace: 'nowrap' }} size='large' onClick={() => signIn()}>
        ログイン
      </Button>
    </>
  )
}

export default LoginButton
