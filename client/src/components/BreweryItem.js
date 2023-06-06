export default function BreweryItem({ brewery }) {
  return (
    <div className="col-4 card">
      {/* <h3>{brewery.name}</h3> */}
      <h4>{brewery.street}</h4>
      <p>{brewery.website_url}</p>
    </div>
  );
}
