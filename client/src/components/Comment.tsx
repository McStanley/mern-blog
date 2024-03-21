import type Comment from '../types/Comment';

interface CommentProps {
  comment: Comment;
}

function Comment({ comment }: CommentProps) {
  return (
    <div className="relative">
      <div className="mt-8 border-l-4 border-dotted border-react-600 border-opacity-50 px-4 pb-1">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-1">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-6"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <p className="font-medium">{comment.author.username}</p>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        <p className="mt-3 break-words">{comment.content}</p>
      </div>
      <div className="absolute top-0 -ml-1.5 h-4 w-4 rounded-full bg-react-600"></div>
    </div>
  );
}

export default Comment;
