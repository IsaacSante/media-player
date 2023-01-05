import ReactPlayer from 'react-player';

export default function PlayerWrapper() {
  <div className="player">
    <ReactPlayer
      className="react-player"
      url={media}
      playing={playing}
      controls={false}
      width="100%"
      height="100%"
      onStart={startCallback}
      onEnded={endCallback}
    />
  </div>;
}
