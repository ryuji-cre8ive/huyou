import React, { useRef, FormEvent } from 'react'
import { TextField } from '@mui/material'

const ChangeAccountName = (props: any) => {
  const { name, setName } = props

  const handleSubmitName = (event: FormEvent<EventTarget & { value: String }>) => {
    const newName = event.currentTarget.value
    console.log(newName)
    setName(newName)
  }
  return (
    <>
      <TextField
        id='standard-basic'
        label='Name'
        variant='standard'
        onChange={handleSubmitName}
        required
        sx={{ marginTop: '10px', width: '20%' }}
      />
    </>
  )
}

export default ChangeAccountName