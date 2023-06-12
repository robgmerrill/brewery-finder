import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppContext from './components/AppContext';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Auth from './pages/AuthPage';
import Favorites from './pages/Favorites';

const tokenKey = 'react-context-jwt';

function App() {
  const [user, setUser] = useState();
  // console.log('user', user);
  const [token, setToken] = useState();
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [favoriteBreweries, setFavoriteBreweries] = useState([]);
  //  const { user, token } = useContext(AppContext);
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
    const auth = JSON.parse(localStorage.getItem(tokenKey));
    if (auth) {
      setUser(auth.user);
      setToken(auth.token);
    }

    setIsAuthorizing(false);
  }, []);

  if (isAuthorizing) return null;

  function handleSignIn(auth) {
    console.log(auth);
    // should i do this
    localStorage.setItem(tokenKey, JSON.stringify(auth));
    setUser(auth.user);
    setToken(auth.token);
  }

  function handleSignOut() {
    localStorage.removeItem(tokenKey);
    setUser(undefined);
    setToken(undefined);
  }

  // useEffect(() => {
  async function fetchFavorites() {
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user }),
    };
    const res = await fetch('/api/favorites', req);
    const data = await res.json();
    // console.log(data);
    if (!res.ok) throw new Error(`fetch Error ${res.status}`);
    // return await res.json();
    setFavoriteBreweries(data);
  }
  // fetchFavorites();
  // }, [user, token]);

  const contextValue = {
    user,
    token,
    handleSignIn,
    handleSignOut,
    fetchFavorites,
    favoriteBreweries,
    setFavoriteBreweries
  };

  return (
    <AppContext.Provider value={contextValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
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
