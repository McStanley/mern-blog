import { useId, useState } from 'react';
import Overlay from './Overlay';
import AuthLabel from './AuthLabel';
import AuthInput from './AuthInput';
import AuthSubmit from './AuthSubmit';
import AuthToggle from './AuthToggle';

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

  const submitDisabled = !username || !password || !passwordConf;

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
        <form
          className="mt-4 flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
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

          <AuthLabel id={pwConfInputId}>Confirm password</AuthLabel>
          <AuthInput
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
