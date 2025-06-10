import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Hls from "hls.js";
import axios from "axios";

const VideoWrapper = styled.div`
  display: flex;
  width: 60%;
  margin-top: 50px;
  margin-left: 35px;
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

const VideoPlayer = ({ videoId, videoType, videoRef }) => {
  const [hlsUrl, setHlsUrl] = useState(null);

  useEffect(() => {
    if (!videoId) {
      const testHls =
        "https://d1fnub9nr40wo8.cloudfront.net/output/8381fae3-8e45-4b91-bf52-8c6d1b72051d/Default/HLS/8381fae3-8e45-4b91-bf52-8c6d1b72051d.m3u8";
      console.log("🧪 테스트용 HLS URL로 대체됨");
      setHlsUrl(testHls);
      return;
    }

    const fetchHlsUrl = async () => {
      try {
        console.log("📡 [VideoPlayer] HLS URL 요청:", videoId);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/videos/geturl/${videoId}`
        );

        const hls =
          response.data.hlsStreamUrl ||
          response.data.hls_url ||
          response.data.hlsUrl ||
          response.data.url;

        if (hls) {
          console.log("✅ [VideoPlayer] HLS URL 가져옴:", hls);
          setHlsUrl(hls);
        } else {
          console.warn("⚠️ [VideoPlayer] 응답에 HLS URL이 없습니다:", response.data);
        }
      } catch (err) {
        console.error("❌ [VideoPlayer] HLS URL 요청 실패:", err);
      }
    };

    fetchHlsUrl();
  }, [videoId]);

  useEffect(() => {
    if (!hlsUrl || !videoRef?.current) return;

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
        />
      </VideoContainer>
    </VideoWrapper>
  );
};

export default VideoPlayer;
