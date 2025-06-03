// src/api/questionApi.js
import axios from "axios";
const API = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("accessToken");

export const fetchInterviewQuestions = async (scriptText) => {
  const res = await axios.post(`${API}/api/interview-questions/resume`, { scripts: scriptText }, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return res.data;
};

export const fetchSpeechQuestions = async (scriptText) => {
  const res = await axios.post(`${API}/api/interview-questions/speech`, { scripts: scriptText }, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return res.data;
};
