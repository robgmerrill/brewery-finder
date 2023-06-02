import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppContext from './components/AppContext';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Auth from './pages/AuthPage';

const tokenKey = 'react-context-jwt';

function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  // const [serverData, setServerData] = useState('');

  // useEffect(() => {
  //   async function readServerData() {
  //     const resp = await fetch('/api/hello');
  //     const data = await resp.json();

  //     console.log('Data from server:', data);

  //     setServerData(data.message);
  //   }

  //   readServerData();
  // }, []);

  useEffect(() => {
    // will be undefined if nothing is in local storage
    const auth = localStorage.getItem(tokenKey);
    if (auth) {
      setUser(auth.user);
      setToken(auth.token);
    }

    setIsAuthorizing(false);
  }, []);

  if (isAuthorizing) return null;

  function handleSignIn(auth) {
    localStorage.setItem(tokenKey, auth);
    setUser(auth.user);
    setToken(auth.token);
  }

  function handleSignOut() {
    localStorage.removeItem(tokenKey);
    setUser(undefined);
    setToken(undefined);
  }

  const contextValue = { user, token, handleSignIn, handleSignOut };

  return (
    <AppContext.Provider value={contextValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path="sign-in" element={<Auth action="sign-in" />} />
            <Route path="sign-up" element={<Auth action="sign-up" />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
