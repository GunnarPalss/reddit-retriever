import axios from 'axios';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });  // Get the session
  if (!session || !session.user.accessToken) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const { subreddit } = req.query;  // Get subreddit from query parameters
  const accessToken = session.user.accessToken;  // Access token from session

  try {
    // Make the request to the Reddit API
    const response = await axios.get(`https://oauth.reddit.com/r/${subreddit}.json`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Process and format the data
    const posts = response.data.data.children.map((post) => ({
      title: post.data.title,
      url: post.data.url,
      author: post.data.author,
      score: post.data.score,
    }));

    // Send the posts back as a JSON response
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}
