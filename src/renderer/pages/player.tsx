import ReactPlayer from 'react-player';
import React, { useState, useEffect } from 'react';

// .player-wrapper {
//     width: auto;
//     height: auto;
//   }
//   .react-player {
//     padding-top: 56.25%;
//     position: relative;
//   }

//   .react-player > div {
//     position: absolute;
//   }

const checkMedia = (incomingMedia: any) => {
  let mediaUrl;
  incomingMedia?.video
    ? (mediaUrl = incomingMedia.video.videoUrl)
    : incomingMedia?.audio
    ? (mediaUrl = incomingMedia.audio.audioUrl)
    : '';
  mediaUrl = 'file://' + mediaUrl;
  return mediaUrl;
};

export default function MediaPlayer(): JSX.Element {
  const [playing, setPlaying] = useState(false);
  const [media, setMedia] = useState('');
  const [muteVideo, setMuteVideo] = useState(false);

  useEffect(() => {
    window.ipcApi.on('media-received', (event, args) => {
      setPlaying(false);
      setMedia('');
      let incomingMedia = JSON.parse(args[0]);
      if (incomingMedia == 'stop') {
        console.log('video has stoped');
      } else {
        let validUrl = checkMedia(incomingMedia);
        setMedia(validUrl);
        setPlaying(true);
      }
    });
  }, []);

  const startCallback = () => {
    console.log(`${media} : is starting`);
  };

  const endCallback = () => {
    setMedia('');
    setPlaying(false);
  };

  return (
    <div className="player">
      <div></div>
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
    </div>
  );
}
