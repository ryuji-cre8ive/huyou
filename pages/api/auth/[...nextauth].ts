import NextAuth, { AuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { executeQuery } from 'lib/graphql'
import { FindUserWithMailQuery } from '~/generated/server'
import getBaseURL from 'lib/baseURL'

export const authOptions: AuthOptions = {
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
    async signIn({ user, account, profile, email, credentials, session }: any): Promise<any> {
      if (account.provider === 'credentials' && user.name == '') {
        return { redirect: { destination: `/users/account/${user.id}` }, session: { user } }
      }
      return true
    },
    async jwt({ token, account, user }: any) {
      if (user) {
        try {
          const baseURL = getBaseURL()
          const res = await fetch(baseURL + `/api/getProfImage?file=${user.image}`)
          const JSONRes = await res.json()

          user.image = JSONRes.url
          token.image = user.image
        } catch (error) {
          console.error('Error fetching user image:', error)
        }
      }

      if (account) {
        token.userID = user.id
        token.image = user.image
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken
      session.user = {
        ...session.user,
        id: token.userID,
        image: token.image,
      }
      return session
    },
  },
}

export default NextAuth(authOptions)
