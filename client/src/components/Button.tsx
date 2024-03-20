import { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

function Button({ type = 'button', disabled, onClick, children }: ButtonProps) {
  return (
    <button
      className={`cursor-pointer rounded-full bg-react-500 px-3 py-1 text-white duration-100 hover:bg-react-600 active:bg-react-700 disabled:cursor-wait disabled:bg-gray-500`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
