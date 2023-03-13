import { useState } from 'react'
import { useRouter } from 'next/router'
import { TextField, Button, Box, InputAdornment } from '@mui/material'
import FileInput from '~/components/FileInput'
import IsContainDelivery from '~/components/IsContainDelivery'
import { executeQuery } from 'lib/graphql'
import { CreateShopItemMutationVariables } from '~/generated/server'
import { useSession } from 'next-auth/react'

const CreateItemPage = () => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [isDeliveryContain, setIsDeliveryContain] = useState('')
  const { data: session } = useSession()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const params: CreateShopItemMutationVariables = {
      title: title,
      description: description,
      isContainDelivery: Boolean(isDeliveryContain),
      price: parseInt(price),
      image: String(selectedFile),
      userID: String(session?.user?.id),
    }
    try {
      await executeQuery('CreateShopItem', params)
      alert('データを追加しました。')
      return router.push('/')
    } catch (err) {
      alert('エラーが発生しました: ' + err)
    }
  }

  const handleFileChange = (e: any) => {
    setSelectedFile(e.target.files[0])
  }

  // const handleRadioChange = (e: any) => {
  //   setIsDeliveryContain()
  // }

  return (
    <Box textAlign={'center'} sx={{ margin: { xs: '20px 50px', sm: '20px 500px' } }}>
      <h1>商品の出品</h1>
      <form onSubmit={handleSubmit}>
        <FileInput onChange={handleFileChange} selectedFile={selectedFile} />
        <TextField
          label='商品名'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          fullWidth
          margin='dense'
        />
        <TextField
          label='商品説明'
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          fullWidth
          margin='dense'
          multiline
        />
        <Box
          sx={{
            display: { xs: 'block', sm: 'flex' },
            justifyContent: { xs: 'center', sm: 'space-around' },
          }}
        >
          <TextField
            label='価格'
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            margin='dense'
            InputProps={{
              endAdornment: <InputAdornment position='start'>円</InputAdornment>,
            }}
          />
          <IsContainDelivery setIsDeliveryContain={setIsDeliveryContain} />
          <Button type='submit'>出品する</Button>
        </Box>
      </form>
    </Box>
  )
}

export default CreateItemPage
