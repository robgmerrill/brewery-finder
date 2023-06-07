import { useContext, useEffect, useState } from 'react';
import AppContext from '../components/AppContext';
import BreweryList from '../components/BreweryList';

export default function Favorites() {
  const { favoriteBreweries, fetchFavorites } = useContext(AppContext);

  useEffect(() => {
    // async function fetchFavorites() {
    //   const req = {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization:
    //         `Bearer ${token}`,
    //     },
    //     body: JSON.stringify({ user }),
    //   };
    //   const res = await fetch('/api/favorites', req);
    //   const data = await res.json();
    //   // console.log(data);
    //   if (!res.ok) throw new Error(`fetch Error ${res.status}`);
    //   // return await res.json();
    //   setFavoriteBreweries(data);
    // }
    // fetchFavorites();
    fetchFavorites(); // bring in from AppContext
  }, []);

  // console.log('favorite breweries', favoriteBreweries);

  if (!favoriteBreweries) {
    return <h1>Loading...</h1>;
  }

  return <BreweryList breweries={favoriteBreweries} inDatabase={true} />;
}
