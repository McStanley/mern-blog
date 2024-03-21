import { isAxiosError } from 'axios';
import { FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';
import useSWR, { Fetcher } from 'swr';
import Input from './Input';
import Button from './Button';
import Comment from './Comment';
import useUser from '../hooks/useUser';
import api from '../utils/api';
import type IComment from '../types/Comment';

const fetcher: Fetcher<IComment[], string> = async (url) => {
  const res = await api.get<{ comments: IComment[] }>(url);
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
        data.map((comment) => <Comment comment={comment} key={comment._id} />)}
    </section>
  );
}

export default Comments;
