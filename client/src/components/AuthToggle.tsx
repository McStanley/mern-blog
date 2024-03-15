import { ReactNode } from 'react';

interface AuthToggleProps {
  toggleModals: () => void;
  children: ReactNode;
}

function AuthToggle({ toggleModals, children }: AuthToggleProps) {
  return (
    <button
      type="button"
      onClick={toggleModals}
      className="mt-4 w-full rounded-full border border-react-600 px-4 py-2 text-react-600 duration-100 hover:border-react-700 hover:text-react-700 active:border-react-800 active:text-react-800"
    >
      {children}
    </button>
  );
}

export default AuthToggle;
