import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async jwt({ token, account, user }: any) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at ? Date.now() + account.expires_at * 1000 : undefined,
          refreshToken: account.refresh_token,
          user,
        }
      }

      return token
    },
    async session({ session, token }: any) {
      if (token?.user) {
        session.user = token.user
      }
      if (token?.accessToken) {
        session.accessToken = token.accessToken
      }
      
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }