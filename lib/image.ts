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
