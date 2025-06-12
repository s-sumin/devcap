// src/api/mypageApi.js
import axiosInstance from "./axiosInstance";

// 발표 영상 목록 가져오기
export const fetchSpeechVideos = async () => {
  try {
    const response = await axiosInstance.get("/api/mypage/getspeech");
    return response.data;
  } catch (error) {
    console.error("❌ 발표 영상 목록 불러오기 실패:", error);
    return [];
  }
};

// 면접 영상 목록 가져오기
export const fetchInterviewVideos = async () => {
  try {
    const response = await axiosInstance.get("/api/mypage/getinterview");
    return response.data;
  } catch (error) {
    console.error("❌ 면접 영상 목록 불러오기 실패:", error);
    return [];
  }
};
