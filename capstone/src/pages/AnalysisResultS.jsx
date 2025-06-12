// src/pages/AnalysisResultS.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import Header from "../components/Header";
import styled from "styled-components";
import axiosInstance from "../api/axiosInstance";

const Container = styled.div`
  padding: 40px 100px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ResultBox = styled.div`
  background: #f9f5ff;
  padding: 24px;
  border-radius: 12px;
  font-size: 16px;
  white-space: pre-wrap;
`;

const AnalysisResultS = () => {
  const { state } = useLocation();
  const { analysisId } = state || {}; // ✅ 이제 type은 필요 없음

  const [content, setContent] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!analysisId) {
      console.warn("⛔ analysisId 누락:", analysisId);
      setError(true);
      return;
    }

    const fetchAnalysisResult = async () => {
      try {
        const formData = new FormData();
        formData.append("id", analysisId); // ✅ FormData로 id 전송

        const response = await axiosInstance.post("/api/report/detail/speech", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const result = response.data.feedback || response.data.result || "분석 결과 없음";
        setContent(result);
      } catch (err) {
        console.error("❌ 발표 분석 결과 불러오기 실패:", err);
        setError(true);
      }
    };

    fetchAnalysisResult();
  }, [analysisId]);

  return (
    <Layout>
      <Header />
      <Container>
        <Title>발표 종합 분석 결과</Title>
        <ResultBox>
          {error
            ? "⚠️ 분석 결과를 불러오지 못했습니다."
            : content || "로딩 중..."}
        </ResultBox>
      </Container>
    </Layout>
  );
};

export default AnalysisResultS;
