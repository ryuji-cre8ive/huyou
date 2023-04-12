import { Box, Rating, Button, Container, Typography, Grid, TextField } from '@mui/material'
import Image from 'next/image'
import { useState, ChangeEvent, FormEvent } from 'react'
import { uploadImg } from 'lib/image'
import { UserIDsQuery, FindUserQuery, AppendNameForCreatedUserMutation } from '~/generated/server'
import { executeQuery } from 'lib/graphql'
import ChangeAccountName from './ChangeAccountName'
import ChangeAccountProfImage from './ChangeAccountProfImage'
import router from 'next/router'
import { useSession } from 'next-auth/react'
import { LoadingButton } from '@mui/lab'
import { set } from 'react-hook-form'

interface Props {
  message?: string
}

const NameAndImageView = ({message}: Props) => {
  const { data: session } = useSession()
  const [name, setName] = useState<String | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState<boolean | undefined>(false)

  const handleSubmit = async (file: File) => {
    setLoading(true)
    try {
      const imageIDinGcs = await uploadImg(file)
      if (!imageIDinGcs) return alert('画像のアップロードに失敗しました。')
      const params = {
        image: imageIDinGcs,
        name: name,
        userID: session?.user.id,
      }
      console.info("params: ", params)

      const data: AppendNameForCreatedUserMutation = await executeQuery(
        'AppendNameForCreatedUser',
        params,
      )
      console.log("data",data)
      if (!data) {
        alert("何かしらのエラーが発生しました。")
        return
      }
      router.push('/users/account/' + data.appendNameForCreatedUser.id)
      setLoading(false)
    } catch (e) {
      setLoading(false)
      alert('予期せぬエラーが発生しました。\n' + e)
    }
  }

  
  return(
    <>
    <Box sx={{ textAlign: 'center', margin: '20px' }}>
    <Typography variant='h5'>{message}</Typography>
    <form
      onSubmit={(event) => {
        event.preventDefault()
        if (file) {
          handleSubmit(file)
        } else {
          alert('ファイルが選択されていません')
        }
      }}
    >
      <ChangeAccountProfImage file={file} setFile={setFile}/>
      <ChangeAccountName setName={setName} name={name}/>
      <LoadingButton loading={loading} variant='outlined' type='submit'>
        Submit
      </LoadingButton>
    </form>
  </Box>
    </>
  )
}

export default NameAndImageView