import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import Layout from "../components/Layout";
import Header from "../components/Header";
import WebcamView from "../components/Practice/WebcamView";
import ScriptPanel from "../components/Practice/ScriptPanel";
import PracticeTitle from "../components/Practice/PracticeTitle";
import PracFinish from "../components/Practice/PracFinish";
import { uploadPracticeVideo } from "../api/videoApi"; // ✅ API 분리

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
  const { file, type, resumeId, speechId } = location.state || {};

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

  const uploadVideo = async (videoBlob) => {
    try {
      await uploadPracticeVideo({
        videoBlob,
        videoTitle,
        type,
      });
    } catch (err) {
      console.error("❌ 영상 업로드 실패:", err);
    }
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
      uploadVideo(blob); // ✅ 브라우저 저장 없이 서버 업로드만
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
          videoTitle={videoTitle}
        />

        {showFinishModal && (
          <ModalOverlay>
            <PracFinish
              videoTitle={videoTitle}
              file={file}
              type={type}
              resumeId={resumeId}
              speechId={speechId}
            />
          </ModalOverlay>
        )}
      </Container>
    </Layout>
  );
};

export default Practice;
