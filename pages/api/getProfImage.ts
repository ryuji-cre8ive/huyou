import { Storage } from '@google-cloud/storage'

export default async function handler(req: any, res: any) {
  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  })

  const bucketName = process.env.BUCKET_NAME ?? ''
  const fileName = req.query.file ?? ''

  if (fileName === '') {
    res.status(400).json('file name is empty')
    return
  }

  const bucket = storage.bucket(bucketName)
  const file = bucket.file(fileName)

  // 有効期間を指定してSigned URLを生成する
  const options = {
    version: 'v4' as const,
    action: 'read' as const,
    expires: Date.now() + 7 * 60 * 60 * 1000, // 1週間有効
  }

  try {
    const [url] = await file.getSignedUrl(options)
    return res.status(200).json({ url })
  } catch (e) {
    console.log('error: ', e)
    handler(req, res)
  }
}
