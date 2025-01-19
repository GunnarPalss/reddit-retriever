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
