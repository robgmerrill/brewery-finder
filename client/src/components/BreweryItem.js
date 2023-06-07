import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { useContext } from 'react';
import AppContext from './AppContext';
import './BreweryItem.css';
import BreweryRating from './BreweryRating';

export default function BreweryItem({ brewery, inDatabase = false }) {
  const { user } = useContext(AppContext);
  // console.log(brewery)
  // I need to hit api on on the back end with a post request. it needs the user id and the brewery id?
  async function handleClick(brewery) {
    console.log('clicked');
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

  return (
    <div className="col-3 card p-4 mx-4">
      <h3>{brewery.name}</h3>
      <h4>{brewery.street}</h4>
      <p>{brewery.website_url}</p>
      {brewery.rating && <BreweryRating rating={brewery.rating}/>}
      {inDatabase && (
        <button onClick={() => handleClick(brewery)}>
          <FaMinusCircle />
        </button>
      )}
      {!inDatabase && (
        <button onClick={() => handleClick(brewery)}>
          <FaPlusCircle />
        </button>
      )}

    </div>
  );
}
