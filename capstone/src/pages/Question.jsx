// ✅ Question.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import Header from "../components/Header";
import QuWebcamView from "../components/QuWebcamView";
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
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(0);
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

  return (
    <Layout>
      <Header />
      <Container>
        <LeftSection>
          <QuWebcamView blurred={isCountingDown} countdown={countdown} />
          <PracticeTitle videoTitle={videoTitle} type={type} />
        </LeftSection>

        <QuestionPanel
          questions={questions}
          isBlurred={isBlurred}
          onToggleBlur={() => setIsBlurred((prev) => !prev)}
          onFinish={() => setIsBlurred(false)}
          onCountdownStart={() => {
            setCountdown(3);
            setIsCountingDown(true);
          }}
          onCountdownEnd={() => {
            setIsCountingDown(false);
            setCountdown(0);
          }}
          countdown={countdown}
          setCountdown={setCountdown}
          setIsCountingDown={setIsCountingDown}
        />
      </Container>
    </Layout>
  );
};

export default Question;
