interface AuthInputProps {
  type: string;
  name: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function AuthInput({ type, name, id, value, onChange }: AuthInputProps) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      className="mt-1 w-full rounded-full border-2 px-4 py-2"
    />
  );
}

export default AuthInput;
