import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { executeQuery } from 'lib/graphql'
import { FindUserWithMailQuery } from '~/generated/server'
import { ConstructionOutlined } from '@mui/icons-material'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        mail: { label: 'mail', type: 'text', placeholder: 'メールアドレス' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req): Promise<any> {
        const data: FindUserWithMailQuery = await executeQuery('FindUserWithMail', {mail: String(credentials?.mail), password: String(credentials?.password)})
        if (data.userWithMail) {
          return data.userWithMail
        }

        return null
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  callbacks: {
    async jwt({ token, account }: any) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }: any) {
      session.accessToken = token.accessToken
      return session
    },
  },
}
export default NextAuth(authOptions)
