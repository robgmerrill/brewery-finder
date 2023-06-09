import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { useContext } from 'react';
import AppContext from './AppContext';
import './BreweryItem.css';
import BreweryRating from './BreweryRating';

export default function BreweryItem({ brewery, inDatabase}) {
  const { user, favoriteBreweries, setFavoriteBreweries } = useContext(AppContext);
  console.log(inDatabase);
  // console.log(favoriteBreweries)
  // I need to hit api on on the back end with a post request. it needs the user id and the brewery id?
  async function handleAddClick(brewery) {
    // console.log('clicked');
    // make a post request. the backend will get this as json.
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ brewery, user }),
    };
    const res = await fetch(`/api/breweries/`, req);
    if (!res.ok) throw new Error(`fetch Error ${res.status}`);
    return await res.json();
  }

  async function handleRemoveClick(brewery) {
    const req = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ brewery, user }),
    };
    console.log('req', req);
    const res = await fetch(`/api/breweries/${brewery.breweryId}`, req);
    console.log('res', res);
    if (!res.ok) throw new Error(`fetch Error ${res.status}`);
    // Filter out the removed brewery from favoriteBreweries array
    const updatedFavoriteBreweries = favoriteBreweries.filter(
      (b) => b.breweryId !== brewery.breweryId
    );
    // Set the state with the new array
    setFavoriteBreweries(updatedFavoriteBreweries);
  }

  console.log(favoriteBreweries);
  const isInDatabase = favoriteBreweries.find(
    (fav) => fav.name === brewery.name
  );
  console.log(isInDatabase);

  if (isInDatabase) {
    inDatabase = (
      <button>
        <FaMinusCircle onClick={() => handleRemoveClick(brewery)}/>
      </button>
    );
  } else {
    inDatabase = (
      <button>
        <FaPlusCircle onClick={() => handleAddClick(brewery)} />
      </button>
    );
  }

  return (
    <div className="col-3 card p-4 mx-4">
      <h3>{brewery.name}</h3>
      <h4>{brewery.street}</h4>
      <p>{brewery.website_url}</p>
      {brewery.rating && <BreweryRating rating={brewery.rating} />}
      {/* {inDatabase && (
        <button onClick={() => handleClick(brewery)}>
          <FaMinusCircle />
        </button>
      )}
      {!inDatabase && (
        <button onClick={() => handleClick(brewery)}>
          <FaPlusCircle />
        </button>
      )} */}
      <div>{inDatabase}</div>
    </div>
  );
}
