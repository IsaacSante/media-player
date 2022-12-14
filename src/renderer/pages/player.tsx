import ReactPlayer from 'react-player';
import React, { useState, useEffect } from 'react';
import screenfull from 'screenfull';
import { url } from 'inspector';

const placeHolder =
  'file:///Users/isaacsante/code/studio-experiments/test-media/video/prairieWinds_video.mp4 ';

export default function MediaPlayer(): JSX.Element {
  const [play, setPlay] = useState(false);
  const [media, setMedia] = useState('');

  const startCallback = () => {
    console.log(`${media} : is starting`);
  };

  const endCallback = () => {
    setMedia('');
    setPlay(false);
  };

  return (
    <div>
      <div className={play ? 'visible' : 'invisible'}>
        <ReactPlayer
          className="absolute top-0 left-0"
          url={media}
          playing={play}
          controls={false}
          muted={true}
          width="100%"
          height="100%"
          onStart={startCallback}
          onEnded={endCallback}
        />
      </div>
    </div>
  );
}
