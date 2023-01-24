import { useEffect, useState } from "react";

function calcPositionOfDuration(position, duration) {
  return (position / duration) * 100;
}

function useWebPlaybackState(webPlaybackState) {
  const [position, setPosition] = useState(null);
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

  return [position, duration, progress];
}
export default useWebPlaybackState;
