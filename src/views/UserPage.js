import { useCallback, useEffect, useState, useRef } from "react";
import SpotifyConnect from "../components/sections/SpotifyConnect";
import SpotifyWebApiPlayer from "../services/api/SpotifyWebApiPlayer";
import useWebPlaybackState from "../hooks/useWebPlaybackState";
import ProgressBar from "../components/ProgressBar";
import AudioBars from "../components/AudioBars";

function UserPage() {
  const queryParams = new URLSearchParams(window.location.search);

  const accessToken = queryParams.get("access_token");
  const token_type = queryParams.get("token_type");

  const [user, setUser] = useState(null);
  const [playerState, setPlayerState] = useState(null);
  const [availableDevices, setAvailableDevices] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [webPlaybackState, setWebPlaybackState] = useState(null);

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

  const handleWebPlaybackState = useCallback((state) => {
    setWebPlaybackState(state);
  }, []);

  const [position, duration, progress] = useWebPlaybackState(webPlaybackState);

  return (
    <>
      {isLoading ? <h1>I'm Loading</h1> : <h1>I'm not Loading</h1>}
      <SpotifyConnect
        accessToken={accessToken}
        handleDeviceID={handleDeviceID}
        handleWebPlaybackState={handleWebPlaybackState}
      />
      {webPlaybackState && (
        <>
          <ProgressBar
            position={position}
            duration={duration}
            progress={progress}
          />
          <AudioBars
            token_type={token_type}
            accessToken={accessToken}
            position={position}
            duration={duration}
            webPlaybackState={webPlaybackState}
          />
        </>
      )}
    </>
  );
}

export default UserPage;
