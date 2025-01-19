import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  const [subreddit, setSubreddit] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    if (!subreddit) return;
    setLoading(true);
      const response = await fetch(`/api/getPosts?subreddit=${subreddit}`);

      const data = await response.json();
      setPosts(data);

      setLoading(false);
    
  };

  return (
    <div>
      <h1>Reddit Retriever</h1>
      {!session ? (
        <button onClick={() => signIn('reddit')}>Sign in</button>
      ) : (
        <div>
          <button onClick={() => signOut()}>Sign out</button>
          <h2>Welcome, {session.user.name}</h2>
        </div>
      )}

      <div>
        <input
          type="text"
          placeholder="Enter subreddit"
          value={subreddit}
          onChange={(e) => setSubreddit(e.target.value)}
        />
        <button onClick={fetchPosts}>Fetch Posts</button>
      </div>

      {loading && <p>Loading...</p>}

      {posts.length > 0 && (
        <ul>
          {posts.map((post, index) => (
            <li key={index}>
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                {post.title}
              </a>
              <p>by {post.author} - {post.score} upvotes</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
