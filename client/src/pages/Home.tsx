import useSWR, { Fetcher } from 'swr';
import PostCard from '../components/PostCard';
import api from '../utils/api';
import type Post from '../types/Post';

const fetcher: Fetcher<Post[], string> = async (url) => {
  const res = await api.get<{ posts: Post[] }>(url);
  return res.data.posts;
};

function Home() {
  const { data: posts, error, isLoading } = useSWR('/posts', fetcher);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>There was an error.</p>;
  }

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
