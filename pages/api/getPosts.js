import axios from 'axios';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  const { subreddit } = req.query;
  const accessToken = session.user.accessToken;
  console.log("komst í getPosts")
  const response = await axios.get(`https://oauth.reddit.com/r/${subreddit}.json`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const posts = response.data.data.children.map((post) => ({
    title: post.data.title,
    url: post.data.url,
    author: post.data.author,
    score: post.data.score,
  }));

  res.status(200).json(posts);

}
