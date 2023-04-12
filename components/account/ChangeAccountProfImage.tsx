import React, { useState, FormEvent, ChangeEvent } from 'react'
import { TextField } from '@mui/material'
import Image from 'next/image'
import { Box, Grid } from '@mui/material'


const ChangeAccountProfImage = (props: any) => {
  const { file, setFile } = props
  const [previewUrl, setPreviewUrl] = useState<String | null>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0]
    if (!selectedFile) return
    setFile(selectedFile)
    console.log(selectedFile)
    const reader = new FileReader()
    reader.onload = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(selectedFile)
  }

  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems='center'
        justifyContent='center'
        sx={{ textAlign: 'center' }}
      >
        <Grid item xs={12} sm={12} sx={{ textAlign: 'center' }}>
          {previewUrl && (
            <Box
              sx={{
                borderRadius: '100%',
                overflow: 'hidden',
                display: 'flex',
                width: '8%',
                height: '8%',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                border: '1px solid black',
              }}
            >
              <Image
                src={String(previewUrl)}
                alt='Preview'
                width='1000'
                height='1000'
                layout='responsive'
              />
            </Box>
          )}
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            type='file'
            onChange={handleFileChange}
            inputProps={{ accept: 'image/*' }}
            required
          />
        </Grid>
      </Grid>
    
    </>
  )
}

export default ChangeAccountProfImage