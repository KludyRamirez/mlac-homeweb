import React, { useEffect, useRef } from "react";
import { styled } from "@mui/system";

// Define styles for components
const MainContainer = styled("div")({
  height: "50%",
  width: "50%",
  backgroundColor: "black",
  borderRadius: "8px",
});

const VideoEl = styled("video")({
  width: "100%",
  height: "100%",
});

// Define the Video component
const Video = ({ stream, isLocalStream }) => {
  const videoRef = useRef();

  useEffect(() => {
    const video = videoRef.current;

    // Check if the stream is a valid MediaStream instance
    if (stream instanceof MediaStream) {
      video.srcObject = stream;

      video.onloadedmetadata = () => {
        video.play();
      };
    } else {
      console.error("Invalid stream type. Expecting a MediaStream instance.");
    }
  }, [stream]);

  return (
    <MainContainer>
      <VideoEl ref={videoRef} autoPlay muted={isLocalStream ? true : false} />
    </MainContainer>
  );
};

export default Video;
