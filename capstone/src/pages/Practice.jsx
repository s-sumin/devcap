import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import Header from "../components/Header";
import WebcamView from "../components/WebcamView";
import ScriptPanel from "../components/ScriptPanel";
import PracticeTitle from "../components/PracticeTitle";
import PracFinish from "../components/PracFinish"; // ✅ 추가

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 60px 100px;
  gap: 60px;
  position: relative;
`;

// 왼쪽 컬럼
const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

// ✅ 모달 오버레이 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3); /* 어두운 반투명 배경 */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Practice = () => {
  const location = useLocation();
  const { file } = location.state || {};
  const [scriptText, setScriptText] = useState("");
  const [isBlurred, setIsBlurred] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false); // ✅

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
    setShowFinishModal(true); // ✅ 모달 열기
  };

  return (
    <Layout>
      <Header />
      <Container>
        <LeftSection>
          <WebcamView />
          <PracticeTitle />
        </LeftSection>

        <ScriptPanel
          scriptText={scriptText}
          isBlurred={isBlurred}
          onToggleBlur={handleToggleBlur}
          onFinish={handleFinish} // ✅
        />

        {showFinishModal && (
          <ModalOverlay>
            <PracFinish />
          </ModalOverlay>
        )}
      </Container>
    </Layout>
  );
};

export default Practice;
