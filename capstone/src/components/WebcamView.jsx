// src/components/WebcamView.jsx
import React from "react";
import styled from "styled-components";
import Webcam from "react-webcam";

const WebcamWrapper = styled.div`
  width: 1000px;
  height: 677px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const WebcamView = () => {
  return (
    <WebcamWrapper>
      <Webcam
        audio={false}
        width="100%"
        height="100%"
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: "user" }}
      />
    </WebcamWrapper>
  );
};

export default WebcamView;
