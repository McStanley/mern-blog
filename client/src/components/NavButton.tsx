import { ReactNode } from 'react';

interface NavButtonProps {
  onClick: () => void;
  children: ReactNode;
}

function NavButton({ onClick, children }: NavButtonProps) {
  return (
    <button
      className="bg-react-500 hover:bg-react-600 active:bg-react-700 rounded-full px-3 py-1 text-white duration-100"
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default NavButton;
