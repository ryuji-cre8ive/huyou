import { Storage } from "@google-cloud/storage"

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
    action: "read" as const,
    expires: Date.now() + 5 * 60 * 1000, // 5分間有効
  }

  const [url] = await file.getSignedUrl(options)
  return res.status(200).json({url})
}
