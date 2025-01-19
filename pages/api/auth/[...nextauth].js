import NextAuth from 'next-auth';
import RedditProvider from 'next-auth/providers/reddit';

export default NextAuth({
  providers: [
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      authorizationUrl: 'https://www.reddit.com/api/v1/authorize',
      scope: 'read',
    }),
  ],
  secret: process.env.JWT_SECRET,
  session: {
    jwt: true,
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,  // Use a secure cookie name
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  // Only set secure cookies in production
        sameSite: 'lax',  // To allow cross-site cookies
      },
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
});
