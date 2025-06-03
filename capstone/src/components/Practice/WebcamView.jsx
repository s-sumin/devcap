// src/components/WebcamView.jsx
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const WebcamWrapper = styled.div`
  width: 1000px;
  height: 677px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const WebcamView = ({ onStreamReady }) => {
  const videoRef = useRef(null);

useEffect(() => {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch(err => {
            console.warn("🎥 play() 실패:", err);
          });
        };
        onStreamReady?.(stream);
      }
    })
    .catch((err) => console.error("웹캠 접근 오류:", err));
}, []);


  return (
    <WebcamWrapper>
      <Video ref={videoRef} muted playsInline />
    </WebcamWrapper>
  );
};

export default WebcamView;
