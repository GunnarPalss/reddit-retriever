// pages/index.js
import { useEffect, useState } from 'react';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subreddit, setSubreddit] = useState('technology'); // Default subreddit

  useEffect(() => {
        const fetchPosts = async () => {
        const response = await fetch(`/api/getPosts?subreddit=${subreddit}`);
        const data = await response.json();
        setPosts(data);
        setLoading(false);
    };

    fetchPosts();
  }, [subreddit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.subreddit.value.trim();
    if (input) {
      setSubreddit(input);
      setLoading(true);
      setPosts([]);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Reddit Viewer</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="subreddit"
          placeholder="Enter subreddit"
          defaultValue={subreddit}
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '5px 10px' }}>Fetch Posts</button>
      </form>

      {loading && <p>Loading...</p>}

      {!loading && (
        <ul style={{ listStyle: 'none', padding: '0' }}>
          {posts.map((post) => (
            <li key={post.data.id} style={{ margin: '10px 0' }}>
              <a
                href={`https://www.reddit.com${post.data.permalink}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'blue' }}
              >
                {post.data.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
