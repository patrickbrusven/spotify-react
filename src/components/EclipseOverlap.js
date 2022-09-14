import SpotifyLogo from "../assets/svgs/SpotifyLogo";
// import SpotifyLogoFull from "../assets/svgs/SpotifyLogoFull";

const EclipseOverlap = () => {
  return (
    <div className="eclipse-view">
      <div className="eclipse-container">
        <div className="eclipse-container__overlay"></div>
      </div>
      <div className="logo-eclipse">
        <div className="bottom-circle"></div>
        <div className="top-circle">
          <SpotifyLogo className="spotify-logo"/>
        </div>
      </div>
      {/* <SpotifyLogoFull /> */}
    </div>
  )
}

export default EclipseOverlap;