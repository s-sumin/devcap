import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ToggleOffIcon from "../assets/icons/togglebutton.svg";
import ToggleOnIcon from "../assets/icons/togglebutton2.svg";

const PanelWrapper = styled.div`
  width: 600px;
  background: white;
  border-radius: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  padding: 32px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #8E48E8;
  font-family: Pretendard;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const ScriptBox = styled.div`
  flex-grow: 1;
  font-size: 25px;
  line-height: 1.8;
  color: #333;
  overflow-y: auto;
  max-height: 600px;
  filter: ${({ blurred }) => (blurred ? "blur(5px)" : "none")};
  transition: filter 0.3s ease;
`;

const ToggleButton = styled.img`
  width: 60px;
  height: 50px;
  cursor: pointer;
`;

const Button = styled.button`
  margin-top: 24px;
  background: #8321FF;
  color: white;
  padding: 14px;
  font-family: Pretendard;
  font-size: 28px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background: #6f1edc;
  }
`;

const TimerText = styled.div`
  font-size: 25px;
  font-weight: 600;
  margin-top: 16px;
  color: #8321FF;
`;
const ScriptPanel = ({ scriptText, isBlurred, onToggleBlur, onFinish, onStartRecording, onStopRecording, videoTitle }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleClick = () => {
    if (!isRunning) {
      if (!videoTitle.trim()) {
        alert("영상 제목을 입력해주세요.");
        return;
      }

      onStartRecording?.(); // 녹화 시작
      setIsRunning(true);
    } else {
      onStopRecording?.(); // 녹화 종료
      setIsRunning(false);
      onFinish?.();        // 종료 처리
    }
  };

  return (
    <PanelWrapper>
      <Header>
        발표 스크립트
        <ToggleButton
          src={isBlurred ? ToggleOnIcon : ToggleOffIcon}
          alt="스크립트 블러 토글"
          onClick={onToggleBlur}
        />
      </Header>

      <ScriptBox blurred={isBlurred}>{scriptText}</ScriptBox>

      <TimerText>⏱ {formatTime(time)}</TimerText>

      <Button onClick={handleClick}>
        {isRunning ? "발표 마치기 →" : "발표 시작하기"}
      </Button>
    </PanelWrapper>
  );
};
export default ScriptPanel;
