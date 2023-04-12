const getBaseURL = () => {
  const protocol = 'http' // プロトコルは適宜変更してください
  const hostname = process.env.HOSTNAME || 'localhost'
  const port = process.env.PORT || 3000
  const baseURL = `${protocol}://${hostname}:${port}`
  return baseURL
}

export default getBaseURL
