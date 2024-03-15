import { Dispatch, SetStateAction, createContext } from 'react';

export interface IUser {
  _id: string;
  username: string;
}

interface IUserContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

export default UserContext;
