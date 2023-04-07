import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { executeQuery } from 'lib/graphql'
import { UserIDsQuery, FindUserQuery } from '~/generated/server'
import type { User } from '~/generated/graphql'
import { Box, Rating, Button, Container, Typography, Grid, TextField } from '@mui/material'
import { useState, ChangeEvent, FormEvent} from 'react'
import Image from 'next/image'

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
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<String | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (!selectedFile) return
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      return
    }
    const formData = new FormData();
    formData.append("file", file);
    console.log("arrive")
  }

  if (!user) return <p>error</p>
  if (user.name === '') return(
    <>
    <Box sx={{textAlign: 'center', marginTop: '20px'}}>
      <Typography variant='h5'>初期登録をしてください</Typography>
      <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center" justifyContent='center' sx={{textAlign: 'center'}}>
        <Grid item xs={12} sm={12} sx={{ textAlign: 'center' }}>
          {previewUrl && (
            <Box sx={{borderRadius: '100%', overflow: 'hidden', display: 'flex', width: '8%', height: '8%', alignItems: 'center', justifyContent: 'center', margin: '0 auto', border: '1px solid black'}}>
              <Image src={String(previewUrl)} alt="Preview" width='1000' height='1000' layout='responsive'/>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            type="file"
            onChange={handleFileChange}
            inputProps={{ accept: "image/*" }}
            required
          />
        </Grid>
      </Grid>
    </form>
    {/* ここまでが画像の処理 */}

    </Box>
      

    </>
  )
  return (
    <>
      this is user account page
    </>
  )
}

export default UserAccountPage
