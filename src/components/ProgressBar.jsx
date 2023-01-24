function huminizeMS(ms) {
  var seconds = (ms / 1000).toFixed(0);
  var minutes = Math.floor(seconds / 60);
  var hours = "";
  if (minutes > 59) {
    hours = Math.floor(minutes / 60);
    hours = hours >= 10 ? hours : "0" + hours;
    minutes = minutes - hours * 60;
    minutes = minutes >= 10 ? minutes : "0" + minutes;
  }
  seconds = Math.floor(seconds % 60);
  seconds = seconds >= 10 ? seconds : "0" + seconds;
  if (hours !== "") {
    return hours + ":" + minutes + ":" + seconds;
  }
  return minutes + ":" + seconds;
}

function ProgressBar({ position, duration, progress }) {
  return (
    <div className="track">
      <span className="track__time">{huminizeMS(parseInt(position))}</span>
      <span className="track__bar-time">
        <span
          className="track__bar-time__progress"
          style={{ width: `${progress}%` }}
        ></span>
      </span>
      <span className="track__time">{huminizeMS(parseInt(duration))}</span>
    </div>
  );
}

export default ProgressBar;
