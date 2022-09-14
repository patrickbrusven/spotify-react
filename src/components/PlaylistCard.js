import { useState, useEffect, useRef } from 'react';

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

  return (
    <li 
      ref={ref} 
      id={'playlist-' + playlist.id} 
      onClick={() => selectPlaylist(playlist.id)}
      onMouseEnter={() => {
          console.log('hi'); 
          setIsHover(true)
        }
      }
      onMouseLeave={() => setIsHover(false)}
    >
      { isHover && <div>
          <h2>{playlist.name}</h2>
          <p>{playlist.description}</p>
        </div>
      }
      <img src={playlist.images[0].url} alt={playlist.name}/>
    </li>
  )
}

export default PlaylistCard;