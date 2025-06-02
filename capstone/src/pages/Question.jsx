// ✅ Question.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import Header from "../components/Header";
import WebcamView from "../components/WebcamView";
import PracticeTitle from "../components/PracticeTitle";
import QuestionPanel from "../components/QuestionPanel";
import { uploadScript } from "../api/scriptApi";

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

const Question = () => {
  const location = useLocation();
  const { file, videoTitle, type } = location.state || {};
  const [isBlurred, setIsBlurred] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const scriptText = e.target.result;
        try {
          const response = await uploadScript(scriptText);
          const questionsArray = Object.values(response);
          setQuestions(questionsArray);
        } catch (err) {
          console.error("질문 불러오기 실패", err);
          setQuestions([]);
        }
      };
      reader.readAsText(file);
    }
  }, [file]);

  const handleToggleBlur = () => {
    setIsBlurred((prev) => !prev);
  };

  const handleFinish = () => {
    // 발표 종료 시 처리 로직 (예: 저장 요청, 이동 등)
  };

  return (
    <Layout>
      <Header />
      <Container>
        <LeftSection>
          <WebcamView />
          <PracticeTitle videoTitle={videoTitle} type={type} />
        </LeftSection>

        <QuestionPanel
          questions={questions}
          isBlurred={isBlurred}
          onToggleBlur={handleToggleBlur}
          onFinish={handleFinish}
        />
      </Container>
    </Layout>
  );
};

export default Question;
