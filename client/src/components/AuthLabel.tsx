interface AuthLabelProps {
  id: string;
  children: string;
}

function AuthLabel({ id, children }: AuthLabelProps) {
  return (
    <label htmlFor={id} className="mt-2 first-of-type:mt-0">
      {children}
    </label>
  );
}

export default AuthLabel;
