import { useEffect, useState } from 'react';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/getPosts?subreddit=Boltinn')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Top Reddit Posts in Technology</h1>
      <ul>
        {posts.map(post => (
          <li key={post.data.id}>
            <a href={`https://www.reddit.com${post.data.permalink}`} target="_blank" rel="noopener noreferrer">
              {post.data.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
