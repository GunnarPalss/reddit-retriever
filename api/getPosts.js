import axios from 'axios';

export default async function handler(req, res) {
  const { subreddit = 'technology' } = req.query;

  const response = await axios.get(`https://www.reddit.com/r/${subreddit}/top.json?limit=5`);
  const posts = response.data.data.children;

  res.status(200).json(posts);

}
