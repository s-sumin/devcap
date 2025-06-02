// ✅ QuestionPanel.jsx
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

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
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #8E48E8;
  font-family: Pretendard;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const QuestionBox = styled.div`
  flex-grow: 1;
  font-size: 25px;
  line-height: 1.8;
  color: #333;
  overflow-y: auto;
  max-height: 600px;
  filter: ${({ blurred }) => (blurred ? "blur(5px)" : "none")};
  transition: filter 0.3s ease;
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
  color: #8321FF;
`;

const CountdownText = styled.div`
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  margin: 20px 0;
  color: #FF5252;
`;

const QuestionPanel = ({ questions = [], isBlurred, onToggleBlur, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    let countdownTimer;
    if (isCountingDown && countdown > 0) {
      countdownTimer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isCountingDown && countdown === 0) {
      setIsCountingDown(false);
      setCountdown(3);
      setCurrentIndex((prev) => prev + 1);
    }
    return () => clearTimeout(countdownTimer);
  }, [isCountingDown, countdown]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setIsCountingDown(true);
    } else {
      alert("마지막 질문입니다.");
    }
  };

  const handleClick = () => {
    if (!isRunning) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
      onFinish?.();
    }
  };

  return (
    <QPanelWrapper>
      <QHeader>질문</QHeader>
      <QuestionBox blurred={isBlurred}>
        {isCountingDown ? <CountdownText>{countdown}</CountdownText> : questions[currentIndex] || "질문이 없습니다."}
      </QuestionBox>
      <TimerText>⏱ {formatTime(time)}</TimerText>
      <Button onClick={handleClick}>
        {isRunning ? "질문 마치기 →" : "질문 시작하기"}
      </Button>
      {isRunning && questions.length > 1 && currentIndex < questions.length - 1 && (
        <Button onClick={handleNext} disabled={isCountingDown}>
          다음 질문 →
        </Button>
      )}
    </QPanelWrapper>
  );
};

export default QuestionPanel;