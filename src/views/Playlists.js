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
          <li key={item.id} onClick={() => selectPlaylist(item.id)}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <img src={item.images[0].url} alt={item.name}/>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Playlists;