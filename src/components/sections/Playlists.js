import PlaylistCard from '../cards/PlaylistCard.js';

const Playlists = (
  { 
    options: {
      playlists: {
        items
      } 
    },
    selectPlaylist
  }
) => {

  return (
    <div className="categories">
      <h2 className="categories__heading">Playlists</h2>
      <ul className="categories__list">
        {items.map((item) => 
          <PlaylistCard key={item.id} playlist={item} selectPlaylist={selectPlaylist} />
        )}
      </ul>
    </div>
  )
}

export default Playlists;