import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import Header from "../components/Header";
import WebcamView from "../components/WebcamView";
import ScriptPanel from "../components/ScriptPanel";
import PracticeTitle from "../components/PracticeTitle";

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

const Question = () => {
  const location = useLocation();
  const { file } = location.state || {};
  const [scriptText, setScriptText] = useState("");
  const [isBlurred, setIsBlurred] = useState(false);

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
      </Container>
    </Layout>
  );

};

export default Question;
