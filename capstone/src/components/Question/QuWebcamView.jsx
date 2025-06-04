import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";

const WebcamWrapper = styled.div`
  width: 1000px;
  height: 677px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  filter: ${({ blurred }) => (blurred ? "blur(5px)" : "none")};
  transition: filter 0.3s ease;
  position: relative;
`;

const CountdownOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 100px;
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
`;

const QuWebcamView = ({ blurred, countdown, onStreamReady }) => {
  const webcamRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const stream = webcamRef.current?.stream;
      if (stream && stream.active) {
        onStreamReady?.(stream);
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);


  return (
    <WebcamWrapper blurred={blurred}>
      <Webcam
        ref={webcamRef}
        audio
        mirrored={false}
        muted
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      {countdown > 0 && <CountdownOverlay>{countdown}</CountdownOverlay>}
    </WebcamWrapper>
  );
};

export default QuWebcamView;
