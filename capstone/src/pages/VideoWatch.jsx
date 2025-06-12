import React from "react";
import { useParams, useLocation } from "react-router-dom";

const VideoWatch = () => {
  const { videoId } = useParams();
  const { state } = useLocation(); // 전달받은 title, type 등

  return (
    <div>
      <h2>녹화 영상 보기</h2>
      <p>Video ID: {videoId}</p>
      <p>제목: {state?.title}</p>
      <p>유형: {state?.type}</p>
      <video
        controls
        width="720"
        src={`https://your-cloudfront-url.com/videos/${videoId}/index.m3u8`}
      />
    </div>
  );
};

export default VideoWatch;
