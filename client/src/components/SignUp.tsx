import { isAxiosError } from 'axios';
import { FormEventHandler, useId, useState } from 'react';
import toast from 'react-hot-toast';
import Overlay from './Overlay';
import AuthLabel from './AuthLabel';
import Input from './Input';
import AuthSubmit from './AuthSubmit';
import AuthToggle from './AuthToggle';
import api from '../utils/api';
import type User from '../types/User';

interface SignUpProps {
  closeModal: () => void;
  toggleModals: () => void;
}

function SignUp({ closeModal, toggleModals }: SignUpProps) {
  const userInputId = useId();
  const pwInputId = useId();
  const pwConfInputId = useId();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      toast.loading('Signing up...', {
        id: 'signup',
      });

      const res = await api.post<{ user: User }>('/auth/sign-up', {
        username,
        password,
        passwordConf,
      });

      toast.success(`Signed up as ${res.data.user.username}`, {
        id: 'signup',
      });

      closeModal();
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          toast.error(error.response.data.errors[0].msg, {
            id: 'signup',
          });
        } else {
          toast.error('Operation failed', {
            id: 'signup',
          });
        }
      } else {
        toast.error('Operation failed', {
          id: 'signup',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const submitDisabled = !username || !password || !passwordConf || isLoading;

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
        <p className="text-center text-3xl font-medium">Sign up</p>
        <p className="mt-4 text-center text-lg text-gray-700">
          Create an account to be able to leave comments under posts.
        </p>
        <form className="mt-4 flex flex-col" onSubmit={handleSubmit}>
          <AuthLabel id={userInputId}>Username</AuthLabel>
          <Input
            type="text"
            name="username"
            id={userInputId}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <AuthLabel id={pwInputId}>Password</AuthLabel>
          <Input
            type="password"
            name="password"
            id={pwInputId}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <AuthLabel id={pwConfInputId}>Confirm password</AuthLabel>
          <Input
            type="password"
            name="passwordConf"
            id={pwConfInputId}
            value={passwordConf}
            onChange={(e) => setPasswordConf(e.target.value)}
          />

          <AuthSubmit disabled={submitDisabled}>Sign up</AuthSubmit>
        </form>
        <hr className="mt-4 border-t-2" />
        <AuthToggle toggleModals={toggleModals}>Sign in</AuthToggle>
      </article>
    </Overlay>
  );
}

export default SignUp;
