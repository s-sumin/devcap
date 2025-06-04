//questionApi.js
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

// ✅ 면접 질문 (resumeId 사용)
export const fetchInterviewQuestions = async (resumeId) => {
  const token = localStorage.getItem("accessToken");

  const payload = { resumeId };

  const res = await axios.post(`${API}/api/interview-questions/resume`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return res.data;
};

// ✅ 발표 질문 (speechId 사용)
export const fetchSpeechQuestions = async (speechId) => {
  const token = localStorage.getItem("accessToken");

  const payload = { speechId };

  const res = await axios.post(`${API}/api/interview-questions/speech`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return res.data;
};
