// src/api/reviewApi.js
import axiosInstance from "./axiosInstance";

// 영상 피드백 데이터 조회 및 변환
export const fetchReviewFeedback = async ({ id, type }) => {
  try {
    const endpoint = type === "speech" ? "/api/report/speech" : "/api/report/interview";
    const res = await axiosInstance.get(endpoint, {
      params: {
        id,
        type,
      },
    });

    const { title, date, feedbacks, timestamps, hlsUrl } = res.data; // ✅ hlsUrl 포함

    const feedbackData = (timestamps || []).map((ts) => {
      const minutes = Math.floor(ts.startTimeSec / 60);
      const seconds = Math.floor(ts.startTimeSec % 60);
      const timeLabel = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
      const left = `${(ts.startTimeSec / 60) * 100}%`;

      return {
        timeLabel,
        seconds: ts.startTimeSec,
        left,
        fillerPhrase: ts.fillerPhrase,
        matchScorePercent: ts.matchScorePercent,
      };
    });

    return {
      title,
      date,
      hlsUrl, // ✅ 포함
      feedbackData,
      feedbacks,
    };
  } catch (error) {
    console.error("❌ [fetchReviewFeedback] 피드백 요청 실패:", error.response?.data || error.message);
    throw error;
  }
};
