import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import Layout from "../components/Layout";
import Header from "../components/Header";
import WebcamView from "../components/Practice/WebcamView";
import ScriptPanel from "../components/Practice/ScriptPanel";
import PracticeTitle from "../components/Practice/PracticeTitle";
import PracFinish from "../components/Practice/PracFinish";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 60px 100px;
  gap: 60px;
  position: relative;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Practice = () => {
  const location = useLocation();
  const { file, type } = location.state || {};

  const [scriptText, setScriptText] = useState("");
  const [isBlurred, setIsBlurred] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [stream, setStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setScriptText(e.target.result);
      };
      reader.readAsText(file);
    }
  }, [file]);

  const handleStreamReady = (incomingStream) => {
    setStream(incomingStream);
  };

  const handleStartRecording = () => {
    if (!videoTitle.trim()) {
      alert("영상 제목을 입력해주세요.");
      return;
    }


    if (!stream) return;
    const recorder = new MediaRecorder(stream);
    const chunks = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);

      console.log("🎬 녹화 완료! Blob URL:", url);
      console.log("📁 예상 파일명:", `${videoTitle || "recording"}.webm`);
      console.log("💾 Blob size:", blob.size, "bytes");
      console.log("💡 다운로드가 시작됩니다.");

      const a = document.createElement("a");
      a.href = url;
      a.download = `${videoTitle || "recording"}.webm`;
      a.click();
    };

    recorder.start();
    setMediaRecorder(recorder);
    setRecordedChunks(chunks);
  };

  const handleStopRecording = () => {
    mediaRecorder?.stop();
  };

  const handleToggleBlur = () => {
    setIsBlurred((prev) => !prev);
  };

  const handleFinish = () => {
    setShowFinishModal(true);
  };

  return (
    <Layout>
      <Header />
      <Container>
        <LeftSection>
          <WebcamView onStreamReady={handleStreamReady} />
          <PracticeTitle
            videoTitle={videoTitle}
            setVideoTitle={setVideoTitle}
            type={type}
          />
        </LeftSection>

        <ScriptPanel
          scriptText={scriptText}
          isBlurred={isBlurred}
          onToggleBlur={handleToggleBlur}
          onFinish={handleFinish}
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
          videoTitle={videoTitle} // ✅ 제목 전달
        />

        {showFinishModal && (
          <ModalOverlay>
            <PracFinish
              videoTitle={videoTitle}
              file={file}
              type={type}
            />
          </ModalOverlay>
        )}
      </Container>
    </Layout>
  );
};

export default Practice;
