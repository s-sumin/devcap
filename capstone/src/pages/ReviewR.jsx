// src/pages/ReviewR.jsx
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Header from "../components/Header";
import VideoPlayer from "../components/Review/VideoPlayer";
import ReviewFeedback from "../components/Review/ReviewFeedback";

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 50px;
  margin: 20px auto auto 35px;
`;

const TotalReviewButton = styled.button`
  width: 353px;
  height: 70px;
  padding: 0 20px;
  background: #8321FF;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  font-family: Pretendard;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 240px;
  margin-top: 380px;

  &:hover {
    background: #6f1edc;
  }
`;

const ReviewR = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { videoId, videoTitle } = location.state || {};
  const videoRef = useRef(null); // ✅ 공유할 ref

  useEffect(() => {
    console.log("🎬 [ReviewR] 영상 정보 확인");
    console.log("📦 videoId:", videoId);
    console.log("📦 videoType:", "resume");
  }, [videoId]);
  const handleNavigateToTotal = () => {
    navigate("/totalreview", {
      state: { videoId, videoTitle, type: "speech" },
    });
  };

  return (
    <Layout>
      <Header />
      <Row>
        <VideoPlayer videoId={videoId} videoType="resume" videoRef={videoRef} />
        <TotalReviewButton onClick={handleNavigateToTotal}>
          면접 종합 분석 보기 <span style={{ marginLeft: "8px" }}>→</span>
        </TotalReviewButton>

      </Row>
      <ReviewFeedback videoRef={videoRef} />
    </Layout>
  );
};

export default ReviewR;
