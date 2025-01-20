import NextAuth from "next-auth";
import RedditProvider from "next-auth/providers/reddit";

export default NextAuth({
  providers: [
    RedditProvider({
      clientId: "tGol9A4DEUCbSv7683rAbw",
      clientSecret: "TGcddlES_LekJAJuG_WWRERIo_kLrQ",
      authorization: 'https://www.reddit.com/api/v1/authorize',
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
  secret: "yQC4q7eylC0E+YBEHhp4tesKcc6EbUeHiqFNa1DoLi4=",
});
