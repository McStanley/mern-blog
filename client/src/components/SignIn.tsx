import { isAxiosError } from 'axios';
import { FormEventHandler, useId, useState } from 'react';
import toast from 'react-hot-toast';
import Overlay from './Overlay';
import AuthLabel from './AuthLabel';
import AuthInput from './AuthInput';
import AuthSubmit from './AuthSubmit';
import AuthToggle from './AuthToggle';
import { IUser } from '../contexts/User';
import api from '../utils/api';

interface SignInProps {
  closeModal: () => void;
  toggleModals: () => void;
}

function SignIn({ closeModal, toggleModals }: SignInProps) {
  const userInputId = useId();
  const pwInputId = useId();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      toast.loading('Signing in...', {
        id: 'signin',
      });

      const res = await api.post<{ user: IUser }>('/auth/sign-in', {
        username,
        password,
      });

      toast.success(`Signed in as ${res.data.user.username}`, {
        id: 'signin',
      });

      closeModal();
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.msg, {
            id: 'signin',
          });
        }
      } else {
        toast.error('Operation failed', {
          id: 'signin',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const submitDisabled = !username || !password || isLoading;

  return (
    <Overlay handleClick={closeModal}>
      <article className="relative rounded-xl bg-white p-8">
        <button
          type="button"
          className="absolute right-5 top-5 font-mono text-xl font-medium"
          onClick={closeModal}
        >
          X
        </button>
        <p className="text-center text-3xl font-medium">Sign in</p>
        <p className="mt-4 text-center text-lg text-gray-700">
          Sign in to leave comments under posts.
        </p>
        <form className="mt-4 flex flex-col" onSubmit={handleSubmit}>
          <AuthLabel id={userInputId}>Username</AuthLabel>
          <AuthInput
            type="text"
            name="username"
            id={userInputId}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <AuthLabel id={pwInputId}>Password</AuthLabel>
          <AuthInput
            type="password"
            name="password"
            id={pwInputId}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <AuthSubmit disabled={submitDisabled}>Sign in</AuthSubmit>
        </form>
        <hr className="mt-4 border-t-2" />
        <AuthToggle toggleModals={toggleModals}>Sign up</AuthToggle>
      </article>
    </Overlay>
  );
}

export default SignIn;
