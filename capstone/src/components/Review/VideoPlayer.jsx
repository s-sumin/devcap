import React from "react";
import styled from "styled-components";

const VideoWrapper = styled.div`
  display: flex;
  width: 80%;
  margin-top: 50px;
  margin-left: 50px;
  border: 1px solid #000;

`
const VideoContainer = styled.div`
  width: 700px;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  background: #000;
  box-sizing: border-box;
`;


const VideoPlayer = () => {
  return (
    <VideoWrapper>
      <VideoContainer>
        <video
          width="100%"
          height="100%"
          controls
          src="https://your-s3-bucket.s3.amazonaws.com/video-name.webm" // ⬅ 실제 S3 링크로 교체
        />

      </VideoContainer>
    </VideoWrapper>
  );
};

export default VideoPlayer;
