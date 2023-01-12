import axios from "axios";

const BASE_URL = "https://api.spotify.com/v1/me/player/";

class SpotifyServicePlayer {
  static getPlaybackState(tokenType, token) {
    return axios(`${BASE_URL}`, {
      headers: {
        Authorization: `${tokenType} ${token}`,
      },
      method: "GET",
    });
  }
  static getAvailableDevices(tokenType, token) {
    return axios(`${BASE_URL}devices`, {
      headers: {
        Authorization: `${tokenType} ${token}`,
      },
      method: "GET",
    });
  }
  static transferPlayback(tokenType, token, device) {
    return axios(`${BASE_URL}`, {
      headers: {
        Authorization: `${tokenType} ${token}`,
      },
      method: "PUT",
      data: {
        device_ids: [device],
      },
    });
  }
}

export default SpotifyServicePlayer;
