import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export const fetchInterviewQuestions = async (scriptText) => {
  const token = localStorage.getItem("accessToken");

  const payload = {
    additionalProp1: scriptText,
    additionalProp2: "",  // 필요 없다면 빈 값 전달
    additionalProp3: "",
  };

  const res = await axios.post(`${API}/api/interview-questions/resume`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return res.data;
};

export const fetchSpeechQuestions = async (scriptText) => {
  const token = localStorage.getItem("accessToken");

  const payload = {
    additionalProp1: scriptText,
    additionalProp2: "",
    additionalProp3: "",
  };

  const res = await axios.post(`${API}/api/interview-questions/speech`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return res.data;
};
