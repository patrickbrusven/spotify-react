import ArrowRight from '../assets/svgs/ArrowRight';
import SpotifyLogo from '../assets/svgs/SpotifyLogo';
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
    <div className="centered-layout">
      <div className="hero">
        <div className="hero__heading">
          <SpotifyLogo />
          <h1>Splorify</h1> 
        </div>
        <h2 className="hero__subheading">Explore the Spotify Web API or login to make the experience more personalized</h2>
        <div className="hero__buttons">
          <Link to="/explore" className="base-anchor" onClick={e => handleTransition(e, '/explore')} >
            <p>EXPLORE</p><ArrowRight />
          </Link>
          <a href={LOGIN_URI} className="base-anchor">
            <p>LOGIN</p><ArrowRight />
          </a>
        </div>
      </div>
    </div>
  )
}

export default LandingPage