import { ReactNode } from 'react';

interface AuthSubmitProps {
  disabled?: boolean;
  children: ReactNode;
}

function AuthSubmit({ disabled, children }: AuthSubmitProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="mt-4 w-full rounded-full bg-react-500 px-4 py-2 text-white duration-100 hover:bg-react-600 active:bg-react-700 disabled:cursor-not-allowed disabled:bg-react-100 disabled:text-react-400"
    >
      {children}
    </button>
  );
}

export default AuthSubmit;
