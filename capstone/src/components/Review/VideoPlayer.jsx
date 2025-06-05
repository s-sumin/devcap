import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Hls from "hls.js";
import axios from "axios";

const VideoWrapper = styled.div`
  display: flex;
  width: 80%;
  margin-top: 50px;
  margin-left: 50px;
  border: 1px solid #000;
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

const VideoPlayer = ({ videoId, videoType }) => {
  const videoRef = useRef(null);
  const [hlsUrl, setHlsUrl] = useState(null);

  useEffect(() => {
    if (!videoId) {
      console.warn("⛔ videoId가 없습니다.");
      return;
    }

    let retryCount = 0;
    const maxRetries = 5;
    const interval = 3000;

    const fetchHlsUrl = async () => {
      try {
        console.log("📡 [VideoPlayer] HLS 상태 요청:", videoId);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/videos/status/${videoId}`
        );

        const hls =
          response.data.hlsStreamUrl ||
          response.data.hls_url ||
          response.data.hlsUrl;

        if (hls) {
          console.log("✅ [VideoPlayer] HLS URL 가져옴:", hls);
          setHlsUrl(hls);
        } else {
          console.warn(
            `⚠️ [VideoPlayer] HLS 미완료 (${retryCount + 1}/${maxRetries}):`,
            response.data.message
          );
          if (retryCount < maxRetries) {
            retryCount++;
            setTimeout(fetchHlsUrl, interval);
          } else {
            console.error("❌ 최대 재시도 횟수 도달. HLS 변환 실패로 간주.");
          }
        }
      } catch (err) {
        console.error("❌ [VideoPlayer] HLS 상태 요청 실패:", err);
      }
    };

    fetchHlsUrl();
  }, [videoId]);

  useEffect(() => {
    if (!hlsUrl || !videoRef.current) return;

    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = hlsUrl;
    }
  }, [hlsUrl]);

  return (
    <VideoWrapper>
      <VideoContainer>
        <video
          ref={videoRef}
          width="100%"
          height="100%"
          controls
          playsInline
        />
      </VideoContainer>
    </VideoWrapper>
  );
};

export default VideoPlayer;
