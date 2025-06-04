// src/components/Practice/WebcamView.jsx
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Webcam from "react-webcam";

const WebcamWrapper = styled.div`
  width: 1000px;
  height: 677px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const WebcamView = ({ onStreamReady }) => {
  const webcamRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const stream = webcamRef.current?.video?.srcObject;
      if (stream) {
        onStreamReady?.(stream);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <WebcamWrapper>
      <Webcam
        ref={webcamRef}
        audio
        mirrored={false}
        muted
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </WebcamWrapper>
  );
};

export default WebcamView;
