import axios from "axios";

const BASE_URL = "https://api.spotify.com/v1/";

class SpotifyServiceTracks {
  static getTracksAudioAnalysis(tokenType, token, trackId) {
    return axios(`${BASE_URL}audio-analysis/${trackId}`, {
      headers: {
        Authorization: `${tokenType} ${token}`,
      },
      method: "GET",
    });
  }
}

export default SpotifyServiceTracks;
