import { useCallback, useEffect, useState, useRef } from "react";
import SpotifyConnect from "../components/sections/SpotifyConnect";
import SpotifyWebApiPlayer from "../services/api/SpotifyWebApiPlayer";
import SpotifyServiceTracks from "../services/api/SpotifyWebApiTracks";
import useWebPlaybackState from "../hooks/useWebPlaybackState";
import ProgressBar from "../components/ProgressBar";
import AudioBar from "../components/StyledAudioBar";

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

  // audio analysis
  const audioBarsWrapper = useRef(null);

  useEffect(() => {
    console.log(webPlaybackState);
    if (audioBarsWrapper.current && webPlaybackState) {
      if (webPlaybackState.paused) {
        audioBarsWrapper.current.childNodes.forEach((node) => {
          node.classList.add("pause-animation");
        });
      } else {
        audioBarsWrapper.current.childNodes.forEach((node) => {
          node.classList.remove("pause-animation");
        });
      }
    }
  }, [webPlaybackState]);

  const audioBarsWrapperStyle = {
    width: "max-content",
    height: "50px",
    backgroundColor: "#121212",
    display: "flex",
    gap: "2px",
    padding: "0px 2px",
    alignItems: "flex-end",
    overflow: "hidden",
  };

  const [audioAnalysis, setAudioAnalysis] = useState(null);
  useEffect(() => {
    const fetchAudioAnalysis = async () => {
      if (webPlaybackState) {
        try {
          const { data } = await SpotifyServiceTracks.getTracksAudioAnalysis(
            token_type,
            accessToken,
            webPlaybackState.track_window.current_track.id
          );
          console.log(data);
          setAudioAnalysis(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchAudioAnalysis();
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
        <>
          <ProgressBar
            position={position}
            duration={duration}
            progress={progress}
          />
          {audioAnalysis && (
            <div ref={audioBarsWrapper} style={audioBarsWrapperStyle}>
              <AudioBar
                position={position}
                duration={duration}
                analysis={audioAnalysis.bars}
              />
              <AudioBar
                position={position}
                duration={duration}
                analysis={audioAnalysis.beats}
              />
              <AudioBar
                position={position}
                duration={duration}
                analysis={audioAnalysis.sections}
              />
              <AudioBar
                position={position}
                duration={duration}
                analysis={audioAnalysis.segments}
              />
              <AudioBar
                position={position}
                duration={duration}
                analysis={audioAnalysis.tatums}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default UserPage;
