import axios from '/var/task/node_modules/axios';

export default async function handler(req, res) {
  const { subreddit = 'technology' } = req.query; // Default subreddit: 'technology'

  // Fetch top posts from the subreddit
  const response = await axios.get(`https://www.reddit.com/r/${subreddit}/top.json?limit=5`);
  const posts = response.data.data.children; // Reddit API response

  res.status(200).json(posts); // Return posts as JSON

}
