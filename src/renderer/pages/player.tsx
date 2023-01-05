import ReactPlayer from 'react-player';
import React, { useState, useEffect } from 'react';

export default function MediaPlayer(): JSX.Element {
  const [playing, setPlaying] = useState(false);
  const [singleMedia, setSingleMedia] = useState(true);
  const [media, setMedia] = useState('');
  const [medias, setMedias] = useState({
    videoMedia: '',
    audioMedia: '',
  });

  const filePathStr = 'file://';

  const playSingleMedia = (incomingMedia: any) => {
    setSingleMedia(true);
    let mediaUrl;
    incomingMedia?.video
      ? (mediaUrl = incomingMedia.video.videoUrl)
      : incomingMedia?.audio
      ? (mediaUrl = incomingMedia.audio.audioUrl)
      : '';
    mediaUrl = filePathStr + mediaUrl;
    setMedia(mediaUrl);
    setPlaying(true);
  };

  const playMixedMedia = (incomingMedia: any) => {
    setSingleMedia(false);
    setMedias((prevMedias) => ({
      ...prevMedias,
      videoMedia: filePathStr + incomingMedia?.video?.videoUrl,
    }));
    setMedias((prevMedias) => ({
      ...prevMedias,
      audioMedia: filePathStr + incomingMedia?.audio?.audioUrl,
    }));
    setPlaying(true);
  };

  const handleMedia = (incomingMedia: any) => {
    let checkMixedMedia =
      incomingMedia.hasOwnProperty('video') &&
      incomingMedia.hasOwnProperty('audio');

    //console.log('is mixed?' + checkMixedMedia);
    checkMixedMedia
      ? playMixedMedia(incomingMedia)
      : playSingleMedia(incomingMedia);
  };

  const resetPlayer = () => {
    setPlaying(false);
    setSingleMedia(true);
    setMedia('');
    setMedias({
      videoMedia: '',
      audioMedia: '',
    });
  };

  useEffect(() => {
    window.ipcApi.on('media-received', (event, args) => {
      resetPlayer();
      let incomingMedia = JSON.parse(args[0]);
      incomingMedia = incomingMedia.selectedMedia;
      //console.log(incomingMedia);
      if (incomingMedia == 'stop') {
        console.log('media has stoped');
      } else {
        console.log('parsing media');
        handleMedia(incomingMedia);
      }
    });
  }, []);

  const startCallback = () => {
    singleMedia
      ? console.log(`${media} : is starting`)
      : console.log(
          `${medias.videoMedia} and ${medias.audioMedia}: is starting`
        );
  };

  const endCallback = () => {
    resetPlayer();
  };

  return (
    <>
      {singleMedia ? (
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
        </div>
      ) : (
        <>
          <div className="player">
            <ReactPlayer
              className="react-player"
              url={medias.videoMedia}
              playing={playing}
              controls={false}
              muted={true}
              width="100%"
              height="100%"
              onStart={startCallback}
              onEnded={endCallback}
            />
          </div>
          <div className="">
            <ReactPlayer
              className=""
              url={medias.audioMedia}
              playing={playing}
              controls={false}
              onStart={startCallback}
              onEnded={endCallback}
            />
          </div>
        </>
      )}
    </>
  );
}
