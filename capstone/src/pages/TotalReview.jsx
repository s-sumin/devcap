import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import Header from "../components/Header";
import ReviewFeedbackList from "../components/TotalReview/ReviewFeedbackList";
import ButtonSection from "../components/TotalReview/ButtonSection";
import axios from "axios";

const Container = styled.div`
  width: 1600px;
  height: 820px;
  border-radius: 30px;
  border: 2px solid var(--Primary-primary_300, #8E48E8);
  background: var(--Primary-primary_050, #F7F1FF);
  padding: 40px 60px;
  display: flex;
  flex-direction: column;
  margin: 30px auto 10px auto;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
`;

const Message = styled.div`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

const TotalReview = () => {
  const [feedbackData, setFeedbackData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/review/total`);
        setFeedbackData(response.data);
      } catch (err) {
        console.error("❌ 서버 요청 실패:", err);
        setError(true);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <Layout>
      <Header />
      <Container>
        {error ? (
          <>
            <Title>종합 분석 결과</Title>
            <Message>⚠️ 서버 연결에 실패했습니다. 피드백을 불러올 수 없습니다.</Message>
          </>
        ) : !feedbackData ? (
          <Message>로딩 중입니다...</Message>
        ) : (
          <>
            <Title>{feedbackData.videoTitle}의 종합 분석 결과</Title>
            <ReviewFeedbackList feedbacks={feedbackData.feedbacks || []} />
          </>
        )}
        <ButtonSection />
      </Container>
    </Layout>
  );
};

export default TotalReview;
