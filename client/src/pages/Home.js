import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../components/AppContext';
import './Home.css';

export default function Home() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) navigate('/sign-in');
  // }, [user, navigate]);

  return (
    <div className="container">
      <h2>Local Brews - Walkable Breweries in the Neighborhood</h2>

      <form>
        <label htmlFor="zip-code">zip code</label>
        <input id="zip-code" />
      </form>
    </div>
  );
}
