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
  webcamStream,
  resumeId,
  speechId,
  practiceVideoId,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);
  const countdownRef = useRef(0);
  const [recorder, setRecorder] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();

  // 🟢 전달받은 질문 확인
  useEffect(() => {
    console.log("🟢 [QuestionPanel] 전달받은 질문 수:", questions.length);
    console.table(questions);
  }, [questions]);

  // 🔵 currentIndex에 따른 질문 추적
  useEffect(() => {
    if (questions.length > 0) {
      console.log("🔵 [QuestionPanel] currentIndex:", currentIndex);
      console.log("🔵 [QuestionPanel] 현재 질문:", questions[currentIndex]);
    }
  }, [currentIndex, questions]);

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
          const response = await uploadResumeVideo({
            videoBlob: blob,
            videoTitle,
            id: resumeId,
          });
          const videoId = response?.videoId;

          if (!videoId) {
            console.warn("⚠️ 업로드 응답에 videoId 없음");
            return;
          }

          navigate("/reviewR", {
            state: { resumeId, videoTitle, type },
          });
        } else {
          console.log("📦 발표 상황: 영상은 업로드되지만 리뷰에는 practiceVideoId 사용");
          await uploadAnswerVideo({
            videoBlob: blob,
            videoTitle,
            id: speechId,
          });

          if (practiceVideoId) {
            navigate("/reviewS", {
              state: { speechId, videoTitle, type },
            });

          } else {
            console.warn("❌ practiceVideoId 없음 → 리뷰 페이지 이동 실패");
          }
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
      console.log("▶️ 녹화 시작");
      setIsRunning(true);
      startRecording();
    } else {
      console.log("⏹ 녹화 종료");
      setIsRunning(false);
      stopRecording();
      onFinish?.();
    }
  };

  const handleNext = () => {
    console.log("➡️ [handleNext] 현재 인덱스:", currentIndex);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setCountdown(3);
      setIsCountingDown(true);
      onCountdownStart?.();
    } else {
      console.log("❗ 마지막 질문 도달");
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
                  <li key={i}>{item?.text || item}</li>
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
