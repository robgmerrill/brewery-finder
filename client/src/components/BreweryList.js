import BreweryItem from './BreweryItem';
import './BreweryList.css';

export default function BreweryList({ breweries, inDatabase }) {
  // console.log(breweries);
  return (
    <div className="list-container d-flex flex-column min-vh-100 justify-content-center align-items-center container">
      <div className="row">
        {breweries.map((brewery) => (
          <BreweryItem
            key={brewery.id}
            brewery={brewery}
            inDatabase={inDatabase}
          />
        ))}
      </div>
    </div>
  );
}
