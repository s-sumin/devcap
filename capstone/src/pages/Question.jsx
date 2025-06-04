import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import Layout from "../components/Layout";
import Header from "../components/Header";
import QuWebcamView from "../components/Question/QuWebcamView";
import PracticeTitle from "../components/Practice/PracticeTitle";
import QuestionPanel from "../components/Question/QuestionPanel";
import {
  fetchInterviewQuestions,
  fetchSpeechQuestions,
} from "../api/questionApi";

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
  const { file, videoTitle, type, resumeId, speechId } = location.state || {};

  const [isBlurred, setIsBlurred] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [webcamStream, setWebcamStream] = useState(null);

  // ✅ 디버깅 로그
  console.log("📍 Question.jsx 진입");
  console.log("📦 location.state:", location.state);

  useEffect(() => {
    if (!type || (!resumeId && !speechId)) {
      console.warn("⚠️ 질문 로딩 조건이 부족합니다. type/resumeId/speechId를 확인하세요.");
      return;
    }

    const loadQuestions = async () => {
      console.log("📨 요청 타입:", type);
      console.log("📨 resumeId:", resumeId);
      console.log("📨 speechId:", speechId);

      try {
        let response;
        if (type === "interview") {
          response = await fetchInterviewQuestions(resumeId);
        } else {
          response = await fetchSpeechQuestions(speechId);
        }

        console.log("✅ 질문 응답 데이터:", response);
        const parsed = response.questions; // ✅ 핵심 수정: 질문 배열 추출
        console.log("✅ 파싱된 질문 배열:", parsed);

        setQuestions(parsed);
      } catch (err) {
        console.error("❌ 질문 불러오기 실패:", err);
        setQuestions([]);
      }
    };

    loadQuestions();
  }, [type, resumeId, speechId]);

  return (
    <Layout>
      <Header />
      <Container>
        <LeftSection>
          <QuWebcamView
            blurred={isCountingDown}
            countdown={countdown}
            onStreamReady={(stream) => setWebcamStream(stream)}
          />
          <PracticeTitle videoTitle={videoTitle} type={type} />
        </LeftSection>

        <QuestionPanel
          questions={questions}
          isBlurred={isBlurred}
          videoTitle={videoTitle}
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
