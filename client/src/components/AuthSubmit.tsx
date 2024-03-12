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
      className="bg-react-500 hover:bg-react-600 active:bg-react-700 disabled:text-react-400 disabled:bg-react-100 mt-4 w-full rounded-full px-4 py-2 text-white duration-100 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

export default AuthSubmit;
