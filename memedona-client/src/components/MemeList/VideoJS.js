import React from "react";
import { usePageVisibility } from "react-page-visibility";
import videojs from "video.js";
import "video.js/dist/video-js.css";

import { MemedonaContext } from "../../MemedonaContext";
import { useOnScreen } from "../../MemedonaContext/useOnScreen";

function VideoJS({ url }) {
  const { videosMuted, setVideosMuted } = React.useContext(MemedonaContext);
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const onScreen = useOnScreen(videoRef, 0.6);
  const isTabVisible = usePageVisibility();

  // Mount PlayerRef
  React.useEffect(() => {
    // console.log(videosMuted);
    const options = {
      autoplay: true,
      controls: true,
      loop: true,
      responsive: true,
      fluid: true,
      muted: videosMuted,
      sources: [
        {
          src: url,
          type: "video/mp4",
        },
      ],
    };

    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;
      playerRef.current = videojs(videoElement, options);
      playerRef.current.on(playerRef.current, "volumechange", (e) => {
        // console.log(videoElement.muted);
        setVideosMuted(videoElement.muted);
        // console.log(videosMuted);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef]);

  // Dismount PlayerRef
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  // Pause when not visible
  React.useEffect(() => {
    if (onScreen && isTabVisible) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
  }, [onScreen, isTabVisible]);

  React.useEffect(() => {
    playerRef.current.muted(videosMuted);
  }, [videosMuted]);

  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        playsinline
        className="video-js vjs-big-play-centered"
      />
    </div>
  );
}

export { VideoJS };
