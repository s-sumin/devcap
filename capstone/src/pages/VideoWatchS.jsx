// src/pages/VideoWatchS.jsx
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Hls from "hls.js";
import Layout from "../components/Layout";
import Header from "../components/Header";
import styled from "styled-components";

const Container = styled.div`
  padding: 40px 100px;
`;

const VideoBox = styled.video`
  width: 100%;
  max-width: 800px;
  height: auto;
  background: black;
  border-radius: 12px;
`;

const VideoWatchS = () => {
  const { state } = useLocation();
  const { hlsUrl } = state || {};
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && hlsUrl) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(hlsUrl);
        hls.attachMedia(videoRef.current);
        return () => hls.destroy();
      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = hlsUrl;
      }
    }
  }, [hlsUrl]);

  return (
    <Layout>
      <Header />
      <Container>
        <h2>발표 영상 재생</h2>
        <VideoBox ref={videoRef} controls />
      </Container>
    </Layout>
  );
};

export default VideoWatchS;
