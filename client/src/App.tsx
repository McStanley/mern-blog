import { useState } from 'react';
import Header from './components/Header';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleModals = () => {
    setShowSignIn((v) => !v);
    setShowSignUp((v) => !v);
  };

  return (
    <>
      <Header
        openSignIn={() => setShowSignIn(true)}
        openSignUp={() => setShowSignUp(true)}
      />
      {showSignIn && (
        <SignIn
          closeModal={() => setShowSignIn(false)}
          toggleModals={toggleModals}
        />
      )}
      {showSignUp && (
        <SignUp
          closeModal={() => setShowSignUp(false)}
          toggleModals={toggleModals}
        />
      )}
    </>
  );
}

export default App;
