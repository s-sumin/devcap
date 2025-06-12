// src/api/questionApi.js
import axiosInstance from "./axiosInstance";

// ✅ 면접 질문 (resumeId 사용)
export const fetchInterviewQuestions = async (resumeId) => {
  const payload = { resumeId };

  try {
    const res = await axiosInstance.post("/api/interview-questions/resume", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    console.error("❌ [fetchInterviewQuestions] 오류:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ 발표 질문 (speechId 사용)
export const fetchSpeechQuestions = async (speechId) => {
  const payload = { speechId };

  try {
    const res = await axiosInstance.post("/api/interview-questions/speech", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    console.error("❌ [fetchSpeechQuestions] 오류:", error.response?.data || error.message);
    throw error;
  }
};
