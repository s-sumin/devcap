import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import InterviewIcon from "../assets/icons/interview.svg";
import SpeechIcon from "../assets/icons/speech.svg";

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 30px 0 20px 100px;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TypeBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 15px 30px;
  background-color: #8321FF;
  color: white;
  font-size: 25px;
  font-weight: 600;
  border-radius: 20px;
  margin-left: -100px;

  img {
    width: 30px;
    height: 30px;
  }
`;

const TitleInput = styled.input`
  border: 0.8 solid #ccc;
  border-radius: 8px;
  color: var(--Black, #000);
  font-family: Pretendard;
  font-size: 30px;
  font-weight: 600;
  line-height: 46px;
  padding: 8px 12px;

  &:focus {
    outline: none;
    border-color: #8321FF;
  }
`;

const DateText = styled.span`
  margin-top: 8px;
  color: var(--Neutral-neutral_600, #555);
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 500;
  line-height: 46px;
  margin-left: -100px;
`;

const PracticeTitle = () => {
  const [videoTitle, setVideoTitle] = useState("");
  const [today, setToday] = useState("");
  const location = useLocation();
  const { type } = location.state || {}; // 'interview' | 'speech'

  useEffect(() => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}년 ${String(
      now.getMonth() + 1
    ).padStart(2, "0")}월 ${String(now.getDate()).padStart(2, "0")}일`;
    setToday(formattedDate);
  }, []);

  const renderBadge = () => {
    if (type === "interview") {
      return (
        <TypeBadge>
          <img src={InterviewIcon} alt="interview" />
          면접
        </TypeBadge>
      );
    } else if (type === "speech") {
      return (
        <TypeBadge>
          <img src={SpeechIcon} alt="speech" />
          발표
        </TypeBadge>
      );
    }
    return null;
  };

  return (
    <TitleSection>
      <TopRow>
        {renderBadge()}
        <TitleInput
          type="text"
          placeholder="영상 제목을 입력하세요"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
        />
      </TopRow>
      <DateText>{today}</DateText>
    </TitleSection>
  );
};

export default PracticeTitle;
