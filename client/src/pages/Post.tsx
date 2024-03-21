import { isAxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import useSWR, { Fetcher } from 'swr';
import Comments from '../components/Comments';
import api from '../utils/api';
import type Post from '../types/Post';

const fetcher: Fetcher<Post, string> = async (url) => {
  const res = await api.get<{ post: Post }>(url);
  return res.data.post;
};

interface PostProps {
  openSignIn: () => void;
}

function Post({ openSignIn }: PostProps) {
  const { id } = useParams() as { id: string };
  const {
    data: post,
    error,
    isLoading,
  } = useSWR<Post>(`/posts/${id}`, fetcher);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    if (isAxiosError(error) && error.response) {
      return <p>{error.response.data.error}</p>;
    }
    return <p>There was an error.</p>;
  }

  if (!post) {
    return <p>No post</p>;
  }

  return (
    <main className="mt-12">
      <div className="flex flex-col items-center">
        <h2 className="decoration text-center text-2xl first-letter:text-react-700">
          {post.title}
        </h2>
        <div className="mt-3 flex items-center gap-1">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <p className="text-lg">{post.author.username}</p>
        </div>
        <div className="mt-3 flex items-center gap-1">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <p className="text-lg">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <p className="mx-auto mt-9 max-w-prose text-justify leading-relaxed">
        {post.content}
      </p>
      <div className="mt-8 text-center text-2xl">~</div>
      <Comments postId={id} openSignIn={openSignIn} />
    </main>
  );
}

export default Post;
