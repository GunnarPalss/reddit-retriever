import axios from 'axios';

export default async function handler(req, res) {
  const { subreddit = 'Boltinn' } = req.query;
  const response = await axios.get(`https://www.reddit.com/r/${subreddit}/top.json?limit=5`);
  res.status(200).json(response.data.data.children);
}
