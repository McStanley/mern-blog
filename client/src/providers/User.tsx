import { ReactNode, useMemo, useState } from 'react';
import UserContext, { IUser } from '../contexts/User';

interface UserProviderProps {
  children: ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
