import React from 'react'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

const AddContentButton: React.FC = () => {
  const router = useRouter()
  return (
    <>
      <Button variant='contained' color='warning' onClick={() => router.push('/items')}>
        出品
      </Button>
    </>
  )
}

export default AddContentButton
