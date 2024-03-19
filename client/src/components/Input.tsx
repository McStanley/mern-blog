import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';

interface InputProps {
  type: HTMLInputTypeAttribute;
  name?: string;
  id?: string;
  placeholder?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

function Input({
  type,
  name,
  id,
  placeholder,
  value,
  onChange,
  disabled,
}: InputProps) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="mt-1 w-full rounded-full border-2 px-4 py-2"
    />
  );
}

export default Input;
