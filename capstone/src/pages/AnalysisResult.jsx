import React from "react";
import { useParams, useLocation } from "react-router-dom";

const AnalysisResult = () => {
  const { analysisId } = useParams();
  const { state } = useLocation();

  return (
    <div>
      <h2>종합 분석 결과</h2>
      <p>분석 ID: {analysisId}</p>
      <p>제목: {state?.title}</p>
      <p>유형: {state?.type}</p>
      {/* 추후 API로 분석 데이터 받아와서 표시 */}
    </div>
  );
};

export default AnalysisResult;
