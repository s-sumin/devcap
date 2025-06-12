// src/components/Mypage/VideoCard.jsx

import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CardWrapper = styled.div`
  background: #f4e9ff;
  border-radius: 16px;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Date = styled.div`
  font-size: 16px;
  color: #555;
  margin-bottom: 4px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled.button`
  background: ${(props) => (props.outline ? "white" : "#8321FF")};
  color: ${(props) => (props.outline ? "#8321FF" : "white")};
  border: 2px solid #8321ff;
  border-radius: 8px;
  padding: 10px 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.outline ? "#f0dfff" : "#6f1edc")};
  }
`;

const VideoCard = ({ item, type }) => {
  const navigate = useNavigate();
  const dateFormatted = item.date?.replace(/-/g, ".") ?? "";

  const handleNavigate = (page, url) => {
    navigate(page, {
      state: {
        videoId: item.analysisId,
        videoTitle: item.title,
        videoUrl: url,
        answerVideoUrl: item.answerVideoUrl,
      },
    });
  };

  return (
    <CardWrapper>
      <InfoBox>
        <Date>{dateFormatted}</Date>
        <Title>{item.title}</Title>
      </InfoBox>

      <ButtonGroup>
        <ActionButton onClick={() => window.open(item.videoUrl, "_blank")}>
          🎬 녹화 영상 보기
        </ActionButton>

        {type === "speech" && item.answerVideoUrl && (
          <ActionButton onClick={() => window.open(item.answerVideoUrl, "_blank")}>
            ▶ 질문 영상 보기
          </ActionButton>
        )}

        <ActionButton outline onClick={() => handleNavigate(type === "speech" ? "/reviewS" : "/reviewR", item.videoUrl)}>
          📊 종합분석결과 보기
        </ActionButton>
      </ButtonGroup>
    </CardWrapper>
  );
};

export default VideoCard;
