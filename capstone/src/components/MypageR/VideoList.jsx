import React from "react";
import VideoItem from "./VideoItem";

const VideoList = ({ videos }) => (
  <>
    {videos.map((video, idx) => (
      <VideoItem key={idx} {...video} />
    ))}
  </>
);

export default VideoList;
