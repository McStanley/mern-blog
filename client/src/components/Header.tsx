import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import NavButton from './NavButton';
import useUser from '../hooks/useUser';
import api from '../utils/api';

interface HeaderProps {
  openSignIn: () => void;
  openSignUp: () => void;
}

function Header({ openSignIn, openSignUp }: HeaderProps) {
  const { user } = useUser();

  const handleLogout = async () => {
    await api.post('/auth/log-out');
    toast.success('Logged out', {
      id: 'logout',
    });
  };

  return (
    <header className="flex justify-between border-b px-4 py-2 lg:px-8 lg:py-3">
      <Link to="/">
        <h1 className="text-3xl font-medium text-react-600">MERN Blog</h1>
      </Link>
      <nav className="flex items-center">
        <ul className="flex gap-4">
          {!user && (
            <>
              <li>
                <NavButton onClick={openSignIn}>Sign in</NavButton>
              </li>
              <li className="hidden md:inline-block">
                <NavButton onClick={openSignUp}>Sign up</NavButton>
              </li>
            </>
          )}
          {!!user && (
            <li>
              <NavButton onClick={handleLogout}>
                Log out{' '}
                <span className="hidden md:inline">{user.username}</span>
              </NavButton>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
