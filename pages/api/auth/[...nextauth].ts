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
        const data: FindUserWithMailQuery = await executeQuery('FindUserWithMail', {
          mail: String(credentials?.mail),
          password: String(credentials?.password),
        })
        if (!data.userWithMail) {
          return null
        }
        return data.userWithMail
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
    async jwt({ token, account, user }: any) {
      if (account) {
        token.userID = user.id
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken
      session.user.id = token.userID
      return session
    },
    async signIn({ user, account, profile, email, credentials }: any) {
      console.log('user', user)
      if (account.provider === 'credentials' && user.name == '') {
        console.log('new user', user.isNewUser)
        return `/users/account/${user.id}`
      }
    },
  },
}

export default NextAuth(authOptions)
