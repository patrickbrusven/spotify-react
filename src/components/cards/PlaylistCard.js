import { useState, useEffect, useRef } from 'react';
import ArrowDown from '../../assets/svgs/ArrowDown';

const PlaylistCard = (
  {
    playlist,
    selectPlaylist
  }
) => {
  const [isHover, setIsHover] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleTouch = event => {
      console.log('playlist touched');
    };

    const element = ref.current;

    element.addEventListener('click', handleTouch);

    return () => {
      element.removeEventListener('click', handleTouch);
    }
  }, []);

  const truncateString = (str, num) =>  {
    return str.slice(0, num) + '...';
  }

  const buttonStyle = {
    position: 'absolute',
    right: '10px',
    bottom: '10px',
  }

  return (
    <li 
      ref={ref} 
      id={'playlist-' + playlist.id}
      className="playlist_card"
      onClick={() => selectPlaylist(playlist.id)}
      onMouseEnter={() => {
          setIsHover(true)
        }
      }
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="playlist_card__image">
        <img className={"playlist_card__image" + ( isHover ? " playlist_card__image--hover" : "")} src={playlist.images[0].url} alt={playlist.name} />
          { isHover &&
            <button className="base-button" style={buttonStyle}>
              <ArrowDown />
            </button>
          }
      </div>
      <div className="playlist_card__content">
        <h2>{playlist.name}</h2>
        <p>{truncateString(playlist.description, 20)}</p>
      </div>
    </li>
  )
}

export default PlaylistCard;