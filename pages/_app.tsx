import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Header from '~/components/Header'

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#579BB1',
      },
      secondary: {
        main: '#E1D7C6',
      },
      success: {
        main: '#ECE8DD',
      },
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <Header islogin={false}/>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
