import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import api from '../utils/api';
import Post from '../types/Post';

function Home() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    (async () => {
      const res = await api.get<{ posts: Post[] | null }>('/posts');
      setPosts(res.data.posts);
    })();
  }, []);

  const postElements = posts
    ? posts.map((post) => <PostCard post={post} key={post._id} />)
    : null;

  return (
    <main>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {postElements}
      </div>
    </main>
  );
}

export default Home;
