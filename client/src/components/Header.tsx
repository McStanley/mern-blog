import NavButton from './NavButton';

interface HeaderProps {
  openSignIn: () => void;
  openSignUp: () => void;
}

function Header({ openSignIn, openSignUp }: HeaderProps) {
  return (
    <header className="flex justify-between border-b px-4 py-2 lg:px-8 lg:py-3">
      <h1 className="text-react-600 text-3xl font-medium">MERN Blog</h1>
      <nav className="flex items-center">
        <ul className="flex gap-4">
          <li>
            <NavButton onClick={openSignIn}>Sign in</NavButton>
          </li>
          <li className="hidden md:inline-block">
            <NavButton onClick={openSignUp}>Sign up</NavButton>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
