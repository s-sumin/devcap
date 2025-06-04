import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const WebcamWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "blurred",
})`
  width: 1000px;
  height: 677px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  filter: ${({ blurred }) => (blurred ? "blur(5px)" : "none")};
  transition: filter 0.3s ease;
  position: relative;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  const videoRef = useRef(null);

  useEffect(() => {
    const initWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          // ✅ play()는 안전하게 실행 (예외 발생 방지)
          try {
            await videoRef.current.play();
          } catch (err) {
            console.warn("🔄 video play() 실패 (무시 가능):", err.message);
          }
        }

        onStreamReady?.(stream);
      } catch (err) {
        console.error("🎥 웹캠 접근 오류:", err);
      }
    };

    initWebcam();
  }, []);

  return (
    <WebcamWrapper blurred={blurred}>
      <Video ref={videoRef} muted playsInline />
      {countdown > 0 && <CountdownOverlay>{countdown}</CountdownOverlay>}
    </WebcamWrapper>
  );
};

export default QuWebcamView;
