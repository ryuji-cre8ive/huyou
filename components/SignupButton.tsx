import React from 'react'
import { Button } from '@mui/material'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

const SignupButton: React.FC = () => {
  const router = useRouter()
  return (
    <>
      <Button
        color='success'
        variant='contained'
        sx={{ whiteSpace: 'nowrap' }}
        size='large'
        onClick={() => router.push('/auth/signup')}
      >
        登録
      </Button>
    </>
  )
}

export default SignupButton
