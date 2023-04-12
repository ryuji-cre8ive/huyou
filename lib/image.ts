import {v4 as uuidv4} from 'uuid'
import { Storage } from "@google-cloud/storage"
import { useCallback } from 'react'

export const encodeImageToBase64URL = (file: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64String = reader.result?.toString().split(',')[1]
      resolve(base64String ?? '')
    }
    reader.onerror = reject
  })
}

export const decodeBase64URLToImage = (base64URL: string) => {
  const binaryString = window.atob(base64URL)
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes
}

export const uploadImg = async (file:File) => {
  const fileName = uuidv4()
  const res = await fetch(`/api/uploadProfImage?file=${fileName}`)
  const { url, fields } = await res.json();
  const body = new FormData();
  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    body.append(key, value as string | Blob );
  });
  const upload = await fetch(url, {method:"POST", body})
  console.log(upload)

  if (!upload.ok) {
    console.log('upload failed')
    return ''
  }
  return fileName
}