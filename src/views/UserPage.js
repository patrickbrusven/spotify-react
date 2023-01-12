import { useCallback, useEffect, useState } from "react";
import SpotifyConnect from "../components/sections/SpotifyConnect";
import SpotifyWebApiPlayer from "../services/api/SpotifyWebApiPlayer";

function UserPage() {
  const queryParams = new URLSearchParams(window.location.search);

  const accessToken = queryParams.get("access_token");
  const token_type = queryParams.get("token_type");

  const [user, setUser] = useState(null);
  const [playerState, setPlayerState] = useState(null);
  const [availableDevices, setAvailableDevices] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const playerState = await SpotifyWebApiPlayer.getPlaybackState(
          token_type,
          accessToken
        );
        const availableDevices = await SpotifyWebApiPlayer.getAvailableDevices(
          token_type,
          accessToken
        );

        setPlayerState(playerState.data);
        setAvailableDevices(availableDevices.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const handleDeviceID = useCallback((id) => {
    SpotifyWebApiPlayer.transferPlayback(token_type, accessToken, id);
  }, []);

  return (
    <>
      {isLoading ? <h1>I'm Loading</h1> : <h1>I'm not Loading</h1>}
      <SpotifyConnect
        accessToken={accessToken}
        handleDeviceID={handleDeviceID}
      />
    </>
  );
}

export default UserPage;
