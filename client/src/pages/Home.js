import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../components/AppContext';
import './Home.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {
  const [breweries, setBreweries] = useState([]);
  const [zipCode, setZipCode] = useState('');
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  console.log(zipCode);

  // useEffect(() => {
  //   if (!user) navigate('/sign-in');
  // }, [user, navigate]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://api.openbrewerydb.org/v1/breweries?by_postal=98108`
      );
      const data = await response.json();
      console.log(data);
    }
    fetchData();
  });

  async function onSubmit(e) {
    e.preventDefault();
    const response = await fetch(
      `https://api.openbrewerydb.org/v1/breweries?by_postal=${zipCode}`
    );
    const data = await response.json();
    console.log(data);
  }

  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <form onSubmit={onSubmit}>
        <label htmlFor="zip-code">enter zip</label>
        <input
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          id="zip-code"
        />
      </form>
    </div>
  );
}
