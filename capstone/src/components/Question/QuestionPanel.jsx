// ✅ QuestionPanel.jsx
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Loading from "../Loading";
import { uploadAnswerVideo, uploadResumeVideo } from "../../api/videoApi";
import { useNavigate } from "react-router-dom";

const QPanelWrapper = styled.div`
  width: 600px;
  background: white;
  border-radius: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  padding: 32px;
  display: flex;
  flex-direction: column;
`;

const QHeader = styled.div`
  font-size: 30px;
  font-weight: 700;
  color: #8e48e8;
  margin-bottom: 20px;
`;

const QuestionBox = styled.div`
  flex-grow: 1;
  font-size: 25px;
  line-height: 1.8;
  color: #333;
  overflow-y: auto;
  max-height: 600px;
`;

const Button = styled.button`
  margin-top: 16px;
  background: #8321FF;
  color: white;
  padding: 14px;
  font-family: Pretendard;
  font-size: 22px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    background: #6f1edc;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const TimerText = styled.div`
  font-size: 25px;
  font-weight: 600;
  margin-top: 16px;
  color: #8321ff;
`;

const QuestionPanel = ({
  questions,
  isBlurred,
  onToggleBlur,
  onFinish,
  onCountdownStart,
  onCountdownEnd,
  countdown,
  setCountdown,
  setIsCountingDown,
  videoTitle,
  type,
  webcamStream
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);
  const countdownRef = useRef(0);
  const [recorder, setRecorder] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate(); // ✅ 페이지 이동용

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => setTime((prev) => prev + 1), 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (countdown === 0) return;

    countdownRef.current = countdown;
    const timer = setInterval(() => {
      countdownRef.current -= 1;
      setCountdown(countdownRef.current);

      if (countdownRef.current <= 0) {
        clearInterval(timer);
        setIsCountingDown(false);
        onCountdownEnd?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, onCountdownEnd, setCountdown, setIsCountingDown]);

  // ✅ showLoading 상태가 true일 때 10초 후 review 페이지로 이동
  useEffect(() => {
    if (showLoading) {
      const timer = setTimeout(() => {
        navigate("/review", {
          state: {
            videoTitle,
            type,
          },
        });
      }, 10000); // 10초 후 이동

      return () => clearTimeout(timer);
    }
  }, [showLoading, navigate, videoTitle, type]);

  const startRecording = async () => {
    if (!webcamStream) {
      alert("웹캠 스트림이 존재하지 않습니다.");
      return;
    }

    const mediaRecorder = new MediaRecorder(webcamStream);
    const chunks = [];

    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      setShowLoading(true);
      try {
        if (type === "interview") {
          await uploadResumeVideo({ videoBlob: blob, videoTitle });
        } else {
          await uploadAnswerVideo({ videoBlob: blob, videoTitle });
        }
      } catch (err) {
        console.error("❌ 영상 업로드 실패:", err);
      }
    };

    mediaRecorder.start();
    setRecorder(mediaRecorder);
  };

  const stopRecording = () => {
    recorder?.stop();
  };

  const handleClick = () => {
    if (!isRunning) {
      if (!videoTitle || !videoTitle.trim()) {
        alert("영상 제목을 입력해주세요.");
        return;
      }
      setIsRunning(true);
      startRecording();
    } else {
      setIsRunning(false);
      stopRecording();
      onFinish?.();
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setCountdown(3);
      setIsCountingDown(true);
      onCountdownStart?.();
    } else {
      alert("마지막 질문입니다.");
    }
  };

  const formatTime = (seconds) =>
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <QPanelWrapper>
      <QHeader>질문</QHeader>
      <QuestionBox>
        {questions.length === 0 ? (
          <div>❌ 질문이 없습니다.</div>
        ) : (
          <>
            <div>{questions[currentIndex]?.question?.text || questions[currentIndex]?.question}</div>
            {questions[currentIndex]?.followUps?.length > 0 && (
              <ul>
                {questions[currentIndex].followUps.map((item, i) => (
                  <li key={i}> {item?.text || item}</li>
                ))}
              </ul>
            )}
          </>
        )}
      </QuestionBox>

      <TimerText>⏱ {formatTime(time)}</TimerText>
      <Button onClick={handleClick}>
        {isRunning ? "질문 마치기" : "질문 시작하기"}
      </Button>
      {isRunning && currentIndex < questions.length - 1 && (
        <Button onClick={handleNext} disabled={countdown > 0}>
          다음 질문 →
        </Button>
      )}
      {showLoading && <Loading />}
    </QPanelWrapper>
  );
};

export default QuestionPanel;