import { useEffect, useState, useRef } from "react";
import AudioBar from "./StyledAudioBar";
import SpotifyServiceTracks from "../services/api/SpotifyWebApiTracks";

function AudioBars({
  token_type,
  accessToken,
  webPlaybackState,
  position,
  duration,
}) {
  const audioBarsWrapper = useRef(null);

  useEffect(() => {
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
  );
}

export default AudioBars;
