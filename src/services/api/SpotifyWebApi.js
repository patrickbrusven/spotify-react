import axios from 'axios';

class SpotifyService {
  static getToken() {
    return axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded', 
        'Authorization' : 'Basic ' + btoa(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET)
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
  }
  static getGenres(token) {
    return axios('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
      headers: {
        'Authorization' : 'Bearer ' + token
      },
      method: 'GET'
    })
  }
  static getCategories(token) {
    return axios('https://api.spotify.com/v1/browse/categories?locale=en_US&country=US', {
      headers: {
        'Authorization' : 'Bearer ' + token
      },
      method: 'GET'
    })
  }
  static getCategoryPlaylists(token, category) {
    return axios(`https://api.spotify.com/v1/browse/categories/${category}/playlists`, {
      headers: {
        'Authorization' : 'Bearer ' + token
      },
      method: 'GET'
    })
  }
  static getPlaylistTracks(token, playlistID) {
    return axios(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
      headers: {
        'Authorization' : 'Bearer ' + token
      },
      method: 'GET'
    })
  }
}

export default SpotifyService;