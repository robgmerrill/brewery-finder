import BreweryItem from './BreweryItem';

export default function BreweryList({ breweries }) {
  console.log(breweries);
  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center container">
      <div className="row">
        {breweries.map((brewery) => (
          <BreweryItem key={brewery.id} brewery={brewery} />
        ))}
      </div>
    </div>
  );
}
