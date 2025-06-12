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
  const {
    file,
    type,
    resumeId,
    speechId,
    videoId: practiceVideoId,
  } = location.state || {};

  const [videoTitle, setVideoTitle] = useState("");
  const [isBlurred, setIsBlurred] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [webcamStream, setWebcamStream] = useState(null);

  useEffect(() => {
    if (!type || (!resumeId && !speechId)) return;

    const loadQuestions = async () => {
      try {
        let response;
        if (type === "interview") {
          response = await fetchInterviewQuestions(resumeId);
        } else {
          response = await fetchSpeechQuestions(speechId);
        }

        console.log("🟡 [Question.jsx] 받아온 전체 질문 목록:", response.questions);
        console.log("🟡 [Question.jsx] 총 질문 수:", response.questions?.length);
        console.table(response.questions);

        setQuestions(response.questions);
      } catch (err) {
        console.error("❌ [Question.jsx] 질문 불러오기 실패:", err);
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
          <PracticeTitle
            videoTitle={videoTitle}
            setVideoTitle={setVideoTitle}
            type={type}
          />
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
          type={type}
          webcamStream={webcamStream}
          resumeId={resumeId}
          speechId={speechId}
          practiceVideoId={practiceVideoId}
        />
      </Container>
    </Layout>
  );
};

export default Question;
