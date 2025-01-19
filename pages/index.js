import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const subreddit = "pics";

  const fetchPosts = async () => {
    if (!subreddit) return;
    setLoading(true);
    const response = await fetch(`/api/getPosts?subreddit=${subreddit}`);
    const data = await response.json();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = (e) => {
    if (e.target.id === "modal-overlay") {
      setIsModalOpen(false);
      setSelectedPost(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-500 mb-4">Reddit Retriever</h1>
        {!session ? (
          <button
            onClick={() => signIn('reddit')}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Sign in
          </button>
        ) : (
          <div>
            <button
              onClick={() => signOut()}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
            >
              Sign out
            </button>
            <h2 className="mt-4 text-2xl">Welcome, {session.user.name}</h2>
          </div>
        )}
        <p className="mt-4 text-lg text-gray-600">
          <strong>Posts from r/{subreddit}</strong>
        </p>
      </div>

      {loading && <p className="mt-4 text-gray-500">Loading...</p>}

      {posts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
              onClick={() => openModal(post)}>
              <div className="h-56 bg-gray-200">
                {post.thumbnail && post.thumbnail !== 'self' && post.thumbnail !== 'default' ? (
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
                    No Image Available
                  </div>
                )}
              </div>
              <div className="p-4">
                <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-blue-600 hover:underline">
                  {post.title}
                </a>
                <p className="mt-2 text-sm text-gray-500">by {post.author} - {post.score} upvotes</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && selectedPost && (
        <div 
          id="modal-overlay"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}>
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">{selectedPost.title}</h2>
            {selectedPost.thumbnail && selectedPost.thumbnail !== 'self' && selectedPost.thumbnail !== 'default' && (
              <img
                src={selectedPost.thumbnail}
                alt={selectedPost.title}
                className="w-full h-56 object-cover mb-4"
              />
            )}
            <p className="text-gray-500">by {selectedPost.author}</p>
            <p className="text-sm text-gray-500 mt-2">Score: {selectedPost.score} upvotes</p>
            <p className="mt-4 text-gray-700">{selectedPost.selftext}</p>
          </div>
        </div>
      )}
    </div>
  );
}
