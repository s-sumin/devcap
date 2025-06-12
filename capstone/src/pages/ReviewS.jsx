// src/pages/ReviewS.jsx
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
  font-size: 26px;
  font-weight: bold;
  color: #222;
`;

const Date = styled.p`
  font-size: 18px;
  color: #666;
`;

const TotalReviewButton = styled.button`
  width: 220px;
  height: 50px;
  background: #8321FF;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-family: Pretendard;
  font-size: 18px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: #6f1edc;
  }
`;

const FeedbackSummaryBox = styled.div`
  width: 90%;
  margin: 0 auto 30px;
  border-radius: 20px;
  background: #f7f1ff;
  border: 2px solid #8e48e8;
  padding: 30px 40px;
`;

const SummaryTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const SummaryList = styled.ul`
  padding-left: 20px;
  font-size: 17px;
  color: #444;
  line-height: 1.7;
`;

const SummaryItem = styled.li`
  margin-bottom: 6px;
`;

const ReviewS = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    speechId,
    videoTitle,
    type = "speech",
  } = location.state || {};

  const videoRef = useRef(null);
  const [feedbackData, setFeedbackData] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [hlsUrl, setHlsUrl] = useState("");

  useEffect(() => {
    console.log("🚀 useEffect 진입");
    console.log("🧾 전달된 props:", { speechId, type });

    const loadFeedback = async () => {
      try {
        console.log("📡 fetchReviewFeedback 호출");
        const result = await fetchReviewFeedback({ id: speechId, type });
        console.log("✅ fetchReviewFeedback 응답:", result);

        
        setTitle(result.title);
        setDate(result.date);
        setFeedbackData(result.feedbackData || []);
        setFeedbacks(result.feedbacks || []);
        setHlsUrl(result.hlsUrl || "");
      } catch (err) {
        console.warn("⚠️ 피드백 데이터 로딩 실패", err);
        setTitle(videoTitle || "제목 없음");
        setDate("날짜 없음");
      }
    };

    if (speechId && type) {
      loadFeedback();
    } else {
      console.warn("⛔ speechId 또는 type이 누락됨", { speechId, type });
    }
  }, [speechId, type, videoTitle]);

  const handleNavigateToTotal = () => {
    navigate("/totalreview", {
      state: { id: speechId, videoTitle, type },
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
              videoId={speechId}
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

        {feedbacks.length > 0 && (
          <FeedbackSummaryBox>
            <SummaryTitle>종합 피드백</SummaryTitle>
            <SummaryList>
              {feedbacks.map((line, idx) => (
                <SummaryItem key={idx}>{line}</SummaryItem>
              ))}
            </SummaryList>
          </FeedbackSummaryBox>
        )}

        {feedbackData.length > 0 && (
          <ReviewFeedback videoRef={videoRef} feedbackData={feedbackData} />
        )}
      </Container>
    </Layout>
  );
};

export default ReviewS;
