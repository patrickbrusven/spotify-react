import { useCallback, useEffect, useState } from "react";
import SpotifyConnect from "../components/sections/SpotifyConnect";
import SpotifyWebApiPlayer from "../services/api/SpotifyWebApiPlayer";

function huminizeMS(ms) {
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds - minutes * 60;
  return `${minutes}:${seconds}`;
}

function calcPositionOfDuration(position, duration) {
  return (position / duration) * 100;
}

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

  const [position, setPosition] = useState(0);
  const [duration, setDurration] = useState(null);
  const progress = calcPositionOfDuration(position, duration);

  useEffect(() => {
    if (webPlaybackState) {
      setPosition(webPlaybackState.position);
      setDurration(webPlaybackState.duration);
      if (!webPlaybackState.paused) {
        const startProgressInterval = setInterval(() => {
          setPosition((position) => {
            return position + 1000;
          });
        }, 1000);
        return () => {
          clearInterval(startProgressInterval);
        };
      }
    }
  }, [webPlaybackState]);

  return (
    <>
      {isLoading ? <h1>I'm Loading</h1> : <h1>I'm not Loading</h1>}
      <SpotifyConnect
        accessToken={accessToken}
        handleDeviceID={handleDeviceID}
        handleWebPlaybackState={handleWebPlaybackState}
      />
      {webPlaybackState && (
        <div className="track">
          <span className="track__time">{huminizeMS(parseInt(position))}</span>
          <span className="track__bar-time">
            <span
              className="track__bar-time__progress"
              style={{ width: `${progress}%` }}
            ></span>
          </span>
          <span className="track__time">{huminizeMS(duration)}</span>
        </div>
      )}
    </>
  );
}

export default UserPage;
