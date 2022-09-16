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

  // const bgImage = {
  //   backgroundImage : `url(${playlist.images[0].url})`
  // }

  return (
    <li 
      ref={ref} 
      id={'playlist-' + playlist.id}
      className="playlist_card"
      // style={bgImage} 
      onClick={() => selectPlaylist(playlist.id)}
      onMouseEnter={() => {
          setIsHover(true)
        }
      }
      onMouseLeave={() => setIsHover(false)}
    >
      { isHover && <div className="playlist_card__content">
          <h2>{playlist.name}</h2>
          <p>{playlist.description}</p>
        </div>
      }
      <img className={"playlist_card__image" + ( isHover ? " playlist_card__image--hover" : "")} src={playlist.images[0].url} alt={playlist.name}/>
    </li>
  )
}

export default PlaylistCard;