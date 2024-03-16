import { ReactNode, useMemo, useState } from 'react';
import UserContext from '../contexts/User';
import User from '../types/User';

interface UserProviderProps {
  children: ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
