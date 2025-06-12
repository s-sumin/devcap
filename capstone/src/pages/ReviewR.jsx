// src/pages/ReviewR.jsx
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Header from "../components/Header";
import VideoPlayer from "../components/Review/VideoPlayer";
import ReviewFeedback from "../components/Review/ReviewFeedback";
import { fetchReviewFeedback } from "../api/reviewApi";

const Container = styled.div`
  padding: 30px 80px;
`;

const TopSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 50px;
  margin-bottom: 60px;
`;

const VideoBox = styled.div`
  width: 700px;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  background: #000;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const Title = styled.h2`
  font-size: 50px;
  font-weight: bold;
  color: #222;
`;

const Date = styled.p`
  font-size: 30px;
  color: #666;
  margin-top: -20px;
`;

const TotalReviewButton = styled.button`
  width: 280px;
  height: 70px;
  background: #8321FF;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 500;
  font-family: Pretendard;
  font-size: 28px;
  cursor: pointer;
  margin-top: 100px;
  margin-left: 725px;

  &:hover {
    background: #6f1edc;
  }
`;


const ReviewR = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    resumeId,     // ✅ videoId 대신 resumeId로 받음
    videoTitle,
    type = "resume",
  } = location.state || {};

  const videoRef = useRef(null);
  const [feedbackData, setFeedbackData] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [hlsUrl, setHlsUrl] = useState("");

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        const result = await fetchReviewFeedback({ id: resumeId, type });
        console.log("✅ [ReviewR] 응답:", result);

        setTitle(result.title);
        setDate(result.date);
        setFeedbackData(result.feedbackData || []);
        setFeedbacks(result.feedbacks || []);
        setHlsUrl(result.hlsUrl || "");
      } catch (err) {
        console.warn("⚠️ 리뷰 피드백 로딩 실패:", err);
        setTitle(videoTitle || "제목 없음");
        setDate("날짜 없음");
      }
    };

    if (resumeId && type) {
      loadFeedback();
    }
  }, [resumeId, type, videoTitle]);

  const handleNavigateToTotal = () => {
    navigate("/totalreview", {
      state: { id: resumeId, videoTitle, type },
    });
  };

  return (
    <Layout>
      <Header />
      <Container>
        <TopSection>
          <VideoBox>
            <VideoPlayer
              hlsUrl={hlsUrl}
              videoId={resumeId}
              videoType={type}
              videoRef={videoRef}
            />
          </VideoBox>

          <InfoBox>
            <Title>{title || "영상 제목"}</Title>
            <Date>{date || "날짜 없음"}</Date>
            <TotalReviewButton onClick={handleNavigateToTotal}>
              종합 분석 보기 →
            </TotalReviewButton>
          </InfoBox>
        </TopSection>

        {(feedbacks.length > 0 || feedbackData.length > 0) && (
          <ReviewFeedback
            videoRef={videoRef}
            feedbackData={feedbackData}
            feedbacks={feedbacks}
          />
        )}
      </Container>
    </Layout>
  );
};

export default ReviewR;