// /pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import RedditProvider from "next-auth/providers/reddit"; // Corrected provider import

export default NextAuth({
  providers: [
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      authorizationUrl: 'https://www.reddit.com/api/v1/authorize',
      scope: 'read',  // Permissions
    }),
  ],
  secret: process.env.JWT_SECRET,
  session: {
    jwt: true,
  },
});
