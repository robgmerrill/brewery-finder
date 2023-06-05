import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../components/AppContext';
import './Home.css';
import { Link } from 'react-router-dom';

export default function Home() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) navigate('/sign-in');
  // }, [user, navigate]);

  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <h2>Learn React</h2>
      <Link to="/exercises/jsx">JSX</Link>
      <h3>Fundamentals</h3>
      <h3>Props and State</h3>
    </div>
  );
}
