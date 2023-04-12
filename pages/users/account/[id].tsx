import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { executeQuery } from 'lib/graphql'
import { UserIDsQuery, FindUserQuery, AppendNameForCreatedUserMutation } from '~/generated/server'
import type { User } from '~/generated/graphql'
import { Box, Rating, Button, Container, Typography, Grid, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useState, ChangeEvent, FormEvent } from 'react'
import Image from 'next/image'
import { encodeImageToBase64URL, uploadImg } from 'lib/image'
import { useSession } from 'next-auth/react'
import router from 'next/router'


export const getStaticPaths: GetStaticPaths = async () => {
  const data: UserIDsQuery = await executeQuery('UserIDs')
  const paths = data.users.map((user) => ({
    params: {
      id: String(user.id),
    },
  }))
  return {
    paths,
    fallback: true, // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.id)
    return {
      props: { user: {} },
    }
  const data: FindUserQuery = await executeQuery('FindUser', { id: String(params.id) })
  console.log('user', data.user)
  return {
    props: { user: data.user },
    revalidate: 1, // このページに変更があった場合にビルドやるよ
    notFound: !data,
  }
}

interface Params {
  user: User
}

export const UserAccountPage: NextPage<Params> = ({ user }) => {
  const { data: session } = useSession()

  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<String | null>(null)
  const [name, setName] = useState<String | null>(null)
  const [loading, setLoading] = useState<boolean | undefined>(false)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0]
    if (!selectedFile) return
    setFile(selectedFile)
    const reader = new FileReader()
    reader.onload = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(selectedFile)
  }

  const handleSubmit = async (file: File) => {
    setLoading(true)
    console.log('submitting...')
    console.log('user: ', session?.user)
    try {
      const imageIDinGcs = await uploadImg(file)
      if (!imageIDinGcs) return alert('画像のアップロードに失敗しました。')
      console.log('gcsURL: ', imageIDinGcs)
      
      const params = {
        image: imageIDinGcs,
        name: name,
        userID: session?.user.id,
      }
      console.log('postdata: ', params)
      const data: AppendNameForCreatedUserMutation = await executeQuery(
        'AppendNameForCreatedUser',
        params,
      )
      console.log('responsed data: ', data)
      router.push('/users/account/' + data.appendNameForCreatedUser.id)
      setLoading(false)
    } catch (e) {
      setLoading(false)
      alert('予期せぬエラーが発生しました。\n' + e)
      console.log(e)
    }
  }

  const handleSubmitName = (event: FormEvent<EventTarget & { value: String }>) => {
    const newName = event.currentTarget.value
    setName(newName)
  }

  if (!user) return <p>error</p>
  if (session?.user.id !== user.id) {
    return (
      <>
        <Box sx={{ textAlign: 'center', margin: '20px' }}>
          <Typography variant='h5'>あなたのアカウントではありません</Typography>
        </Box>
      </>
    )
  }
  if (user.name === '')
    return (
      <>
        <Box sx={{ textAlign: 'center', margin: '20px' }}>
          <Typography variant='h5'>初期登録をしてください</Typography>
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
            <TextField
              id='standard-basic'
              label='Name'
              variant='standard'
              onChange={handleSubmitName}
              required
              sx={{ marginTop: '10px', width: '20%' }}
            />
            <LoadingButton loading={loading} variant='outlined' type='submit'>
              Submit
            </LoadingButton>
          </form>
        </Box>
      </>
    )
  return (
    <> 
      this is user account page for {user.name}

      <Box sx={{ textAlign: 'center', margin: '20px' }}>
      <Typography variant='h5'>初期登録をしてください</Typography>
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
            <TextField
              id='standard-basic'
              label='Name'
              variant='standard'
              onChange={handleSubmitName}
              required
              sx={{ marginTop: '10px', width: '20%' }}
            />
            <LoadingButton loading={loading} variant='outlined' type='submit'>
              Submit
            </LoadingButton>
          </form>
      </Box>
    </>
  ) 
}
export default UserAccountPage
