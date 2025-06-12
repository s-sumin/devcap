import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaClipboardList } from "react-icons/fa";

const ItemBox = styled.div`
  background: #f5eaff;
  border-radius: 16px;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const DateText = styled.div`
  font-size: 14px;
  color: #555;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #222;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #8321ff;
  color: white;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #6e1ed1;
  }

  svg {
    font-size: 16px;
  }
`;

const OutlineButton = styled(Button)`
  background: white;
  color: #8321ff;
  border: 2px solid #8321ff;

  &:hover {
    background: #f3eaff;
  }
`;

const SpeechVideoItem = ({ video }) => {
  const navigate = useNavigate();

  const handleViewAnalysis = () => {
    if (video.analysisId) {
      navigate(`/totalReview/${video.analysisId}`);
    } else {
      alert("아직 분석 결과가 없습니다.");
    }
  };

  return (
    <ItemBox>
      <TopRow>
        <DateText>{video.date}</DateText>
        <Title>{video.title}</Title>
      </TopRow>
      <ButtonRow>
        <Button as="a" href={video.videoUrl} target="_blank" rel="noopener noreferrer">
          <FaPlay /> 녹화 영상 보기
        </Button>
        <Button as="a" href={video.answerVideoUrl} target="_blank" rel="noopener noreferrer">
          <FaPlay /> 질문 영상 보기
        </Button>
        <OutlineButton onClick={handleViewAnalysis}>
          <FaClipboardList /> 종합분석결과 보기
        </OutlineButton>
      </ButtonRow>
    </ItemBox>
  );
};

export default SpeechVideoItem;
