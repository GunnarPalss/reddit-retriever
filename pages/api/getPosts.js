import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { subreddit } = req.query;
    const { data } = await axios.get(`https://www.reddit.com/r/${subreddit}.json`);

    const posts = data.data.children.map((post) => ({
      title: post.data.title,
      url: post.data.url,
      author: post.data.author,
      score: post.data.score,
    }));

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}
