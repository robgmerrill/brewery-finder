import { FaStar, FaRegStar } from 'react-icons/fa';

export default function BreweryRating({rating}) {
  switch(rating) {
    case 10:
      return (
        <div className="star-container">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
      );
    default:
      return <><FaRegStar /></>
  }

}
