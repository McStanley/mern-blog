import { isAxiosError } from 'axios';
import { FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';
import useSWR, { Fetcher } from 'swr';
import Input from './Input';
import Button from './Button';
import useUser from '../hooks/useUser';
import api from '../utils/api';
import type Comment from '../types/Comment';

const fetcher: Fetcher<Comment[], string> = async (url) => {
  const res = await api.get<{ comments: Comment[] }>(url);
  return res.data.comments;
};

interface CommentsProps {
  postId: string;
  openSignIn: () => void;
}

function Comments({ postId, openSignIn }: CommentsProps) {
  const { user } = useUser();
  const { data, isLoading, mutate } = useSWR(
    `/posts/${postId}/comments`,
    fetcher,
  );
  const [comment, setComment] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setDisabled(true);
    toast.dismiss();

    try {
      await api.post('/comments', { post: postId, content: comment });
      setComment('');
      mutate();
    } catch (error) {
      interface ErrorData {
        error?: string;
        errors?: Array<{ msg: string }>;
      }

      if (isAxiosError<ErrorData>(error) && error.response) {
        if (error.response.data.error) {
          toast.error(error.response.data.error);
        }

        if (error.response.data.errors) {
          error.response.data.errors.forEach((err) => {
            toast.error(err.msg);
          });
        }
      } else {
        toast.error('Try again later...');
      }
    } finally {
      setDisabled(false);
    }
  };

  const form = (
    <form
      className="mx-auto flex max-w-xl flex-col items-center gap-4 md:flex-row"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder="Write your comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={disabled}
      />
      <Button type="submit" disabled={disabled}>
        Submit
      </Button>
    </form>
  );

  const authPrompt = (
    <p className="text-center">
      You need to{' '}
      <button className="text-react-600" onClick={openSignIn}>
        sign in
      </button>{' '}
      to write a comment.
    </p>
  );

  return (
    <section className="mx-auto mt-8 max-w-screen-lg">
      <h3 className="mb-4 text-center text-2xl">Comments</h3>
      {user ? form : authPrompt}
      {isLoading && (
        <p className="mt-6 text-center text-gray-600">Loading comments...</p>
      )}
      {!isLoading && !data?.length && (
        <p className="mt-6 text-center text-gray-600">
          Be the first to comment...
        </p>
      )}
      {data &&
        data.map((comment) => (
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
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
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
        ))}
    </section>
  );
}

export default Comments;
