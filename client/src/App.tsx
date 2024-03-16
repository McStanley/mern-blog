import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import useUser from './hooks/useUser';
import api from './utils/api';
import objectsEqual from './utils/objectsEqual';
import User from './types/User';

const router = createBrowserRouter([{ path: '/', element: <Home /> }]);

function App() {
  const { user, setUser } = useUser();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    type Response = AxiosResponse<{ user: User | null }>;

    const interceptor = api.interceptors.response.use((res: Response) => {
      if (!objectsEqual(res.data.user, user)) {
        setUser(res.data.user);
      }

      return res;
    });

    return () => api.interceptors.response.eject(interceptor);
  }, [user, setUser]);

  useEffect(() => {
    api.get('/auth/whoami');
  }, []);

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
      <div className="mx-auto my-6 max-w-7xl px-8">
        <RouterProvider router={router} />
      </div>
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
      <Toaster />
    </>
  );
}

export default App;
