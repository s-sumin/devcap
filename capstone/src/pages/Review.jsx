import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import Header from "../components/Header";
import VideoPlayer from "../components/Review/VideoPlayer";

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 50px;
  margin: 20px auto auto 35px;

`

const TotalReviewButton = styled.button`
  height: 50px;
  padding: 0 20px;
  background: #8321FF;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #6f1edc;
  }
`;


const Review = () => {
  return (
    <Layout>
      <Header />
      <Row>
        <VideoPlayer />
        <TotalReviewButton>종합 분석 보기</TotalReviewButton>
      </Row>
    </Layout>
  );
};

export default Review;
