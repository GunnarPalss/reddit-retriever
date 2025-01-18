// api/getPosts.js
import axios from 'axios';

export default async function handler(req, res) {
  const { subreddit = 'technology' } = req.query; // Default subreddit: 'technology'

  try {
    // Fetch top posts from the subreddit
    const response = await axios.get(`https://www.reddit.com/r/${subreddit}/top.json?limit=5`);
    const posts = response.data.data.children; // Reddit API response

    res.status(200).json(posts); // Return posts as JSON
  } catch (error) {
    console.error('Error fetching subreddit data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from Reddit' });
  }
}
