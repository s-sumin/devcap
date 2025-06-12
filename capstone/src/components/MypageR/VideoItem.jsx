import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Item = styled.div`
  background-color: #f3eaff;
  padding: 20px 24px;
  margin-bottom: 16px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.div`
  font-size: 18px;
  font-weight: 600;
  span {
    display: block;
    color: #888;
    font-size: 14px;
    margin-bottom: 4px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;

  button {
    background-color: #8321ff;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
  }

  button:last-child {
    background-color: #ddd;
    color: #333;
  }
`;

const VideoItem = ({ date, title, type, videoId, analysisId }) => {
  const navigate = useNavigate();

  const handleWatchClick = () => {
    navigate(`/watch/${videoId}`, { state: { title, type } });
  };

  const handleAnalysisClick = () => {
    navigate(`/analysis/${analysisId}`, { state: { title, type } });
  };

  return (
    <Item>
      <Info>
        <span>{date}</span>
        {title}
      </Info>
      <ButtonGroup>
        <button onClick={handleWatchClick}>녹화 영상 보기</button>
        <button onClick={handleAnalysisClick}>종합분석결과 보기</button>
      </ButtonGroup>
    </Item>
  );
};

export default VideoItem;
