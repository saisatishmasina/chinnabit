import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

console.log("✅ NEXTAUTH_URL:", process.env.NEXTAUTH_URL) // Debugging

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
  debug: true, // Enable debug to see more logs
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
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
        const siteUrl = "http://cibit.duckdns.org";
        console.log(`🔄 Redirecting from: ${url} to ${siteUrl}, baseUrl: ${baseUrl}`);

        if (url.includes("/api/auth/callback")) {
            console.log("✅ Google Auth callback detected - redirecting to homepage");
            return siteUrl;
        }

        if (url === `${baseUrl}/auth/signin`) {
          console.log("✅ signin page");
          return `${siteUrl}/auth/signin`;
        }
      
        // Check if the URL is an internal URL (relative path) and allow it.
        if (url.startsWith("/")) {
            return `${siteUrl}${url}`; // Prepend siteUrl
        }
      
        // If it is external, let it go.
        return url;
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
