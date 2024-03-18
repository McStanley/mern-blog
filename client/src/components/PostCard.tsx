import { Link } from 'react-router-dom';
import Post from '../types/Post';

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  return (
    <article className="group relative flex h-96 flex-col-reverse justify-between overflow-hidden rounded-xl border border-react-800">
      <Link to={`/posts/${post._id}`} className="absolute size-full">
        <img
          src={`https://picsum.photos/400?random=${post._id}`}
          alt={post.title}
          className="size-full object-cover duration-200 group-hover:scale-105 group-hover:contrast-125"
        />
      </Link>
      <Link to={`/posts/${post._id}`}>
        <div className="m-2 max-w-max rounded-lg border border-react-500 bg-react-700 bg-opacity-70 py-2 pl-3 pr-6 backdrop-blur-md">
          <p className="text-3xl font-medium text-white duration-200 group-hover:text-[2.1rem]">
            {post.title}
          </p>
        </div>
      </Link>
      <div className="ml-auto flex max-w-max items-center gap-1 rounded-bl-xl border-b border-l border-react-500 bg-react-700 bg-opacity-70 px-3 pb-2 pt-2 text-white backdrop-blur">
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
        <p className="text-xl font-medium">{post.author.username}</p>
      </div>
    </article>
  );
}

export default PostCard;
