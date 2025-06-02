import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import Layout from "../components/Layout";
import Header from "../components/Header";
import WebcamView from "../components/WebcamView";
import ScriptPanel from "../components/ScriptPanel";
import PracticeTitle from "../components/PracticeTitle";
import PracFinish from "../components/PracFinish";

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
  const [videoTitle, setVideoTitle] = useState(""); // ✅ 제목 상태

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setScriptText(e.target.result);
      };
      reader.readAsText(file);
    }
  }, [file]);

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
          <WebcamView />
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
