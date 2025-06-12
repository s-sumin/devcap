import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Hls from "hls.js";
import axiosInstance from "../../api/axiosInstance"; // ✅ 수정된 부분

const VideoWrapper = styled.div`
  display: flex;

`;

const VideoContainer = styled.div`
  width: 700px;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  background: #000;
  box-sizing: border-box;
`;

const VideoPlayer = ({ hlsUrl, videoRef }) => {
  useEffect(() => {
    if (!hlsUrl || !videoRef?.current) {
      console.warn("⛔ [VideoPlayer] hlsUrl 없음");
      return;
    }

    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);

      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = hlsUrl;
    } else {
      console.warn("❌ [VideoPlayer] HLS 미지원 브라우저입니다.");
    }
  }, [hlsUrl, videoRef]);

  return (
    <VideoWrapper>
      <VideoContainer>
        <video
          ref={videoRef}
          width="100%"
          height="100%"
          controls
          playsInline
          muted
        />
      </VideoContainer>
    </VideoWrapper>
  );
};


export default VideoPlayer;
