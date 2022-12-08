import ArrowRight from '../assets/svgs/ArrowRight';
import { Link, useNavigate } from 'react-router-dom';

function LandingPage() {
  const LOGIN_URI ='http://localhost:8080/login';
  const navigate = useNavigate();

  const handleTransition = (e, route) => {
    e.preventDefault();
    setTimeout(() => {
      navigate(route);
    }, 1000);
  }

  return (
    <div className="App centered-layout">
    <h1>Splorify</h1>
    <Link to="/explore" className="base-anchor" onClick={e => handleTransition(e, '/explore')} >
      <p>EXPLORE</p><ArrowRight />
    </Link>
    <a href={LOGIN_URI} className="base-anchor">
      <p>LOGIN</p><ArrowRight />
    </a>
  </div>
  )
}

export default LandingPage