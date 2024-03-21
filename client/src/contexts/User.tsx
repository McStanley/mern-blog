import { Dispatch, SetStateAction, createContext } from 'react';
import type User from '../types/User';

interface IUserContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

export default UserContext;
