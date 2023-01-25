import styled, { keyframes } from "styled-components";

const audioAnimation = (props) => {
  function buildKeyframe(arr) {
    let percentOfDurationStart = ((arr.start * 1000) / props.duration) * 100;
    let percentOfDuration = ((arr.duration * 1000) / props.duration) * 100;
    let percentHeight = arr.confidence * 100;
    return `
    ${percentOfDurationStart}% { height: ${percentHeight}%; }
    ${percentOfDuration + percentOfDurationStart / 2}% { height: 0%; }
    `;
  }

  const keyframeArr = props.analysis.map((arr) => {
    return buildKeyframe(arr);
  });

  return keyframes`
    ${keyframeArr.join(" ")}
  `;
};

const StyledAudioBar = styled.div`
  width: 10px;
  height: 50px;
  background-color: green;
  animation-name: ${audioAnimation};
  animation-duration: ${(props) => props.duration / 1000}s;
  animation-iteration-count: infinite;
`;

export default function AudioBar({ position, duration, analysis }) {
  return (
    <StyledAudioBar
      position={position}
      duration={duration}
      analysis={analysis}
    />
  );
}
