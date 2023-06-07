import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../components/AppContext';
import './Home.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import BreweryList from '../components/BreweryList';

export default function Home() {
  const [breweries, setBreweries] = useState([]);
  const [zipCode, setZipCode] = useState('');
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  // console.log(zipCode);
  // console.log(breweries);
  // useEffect(() => {
  //   if (!user) navigate('/sign-in');
  // }, [user, navigate]);

  async function onSubmit(e) {
    e.preventDefault();
    const response = await fetch(
      `https://api.openbrewerydb.org/v1/breweries?by_postal=${zipCode}`
    );
    const data = await response.json();
    console.log(data);
    setBreweries(data);
  }

  return (
    <div>
      {/* // <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center"> */}
      <form onSubmit={onSubmit}>
        <label htmlFor="zip-code">enter zip</label>
        <input
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          id="zip-code"
        />
      </form>
      <div className="mb-5">
        {breweries.length > 0 ? (
          <BreweryList breweries={breweries} />
        ) : (
          <h1 className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            Search for neighborhood breweries
          </h1>
        )}
      </div>
    </div>
  );
}
