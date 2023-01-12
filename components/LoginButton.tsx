import React from 'react'
import { Button } from '@mui/material'

const LoginButton: React.FC = () => {
  return (
    <>
      <Button color='success' variant='contained' sx={{whiteSpace:'nowrap'}} size="large">
        ログイン
      </Button>
    </>
  )
}

export default LoginButton
