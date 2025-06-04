// 📁 src/api/videoApi.js
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

const getToken = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("❌ accessToken이 없습니다. 로그인이 필요합니다.");
  }
  return token;
};

// ✅ 영상 업로드 API
export const uploadPracticeVideo = async ({ videoBlob, videoTitle, type }) => {
  const token = getToken();
  const formData = new FormData();

  formData.append("file", videoBlob, `${videoTitle || "recording"}.webm`);
  formData.append("type", type === "interview" ? "resume" : "speech");

  try {
    const res = await axios.post(`${API}/api/videos/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Content-Type 생략 → axios가 FormData에 맞게 자동 처리
      },
      withCredentials: true,
    });

    console.log("✅ [uploadPracticeVideo] 업로드 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ [uploadPracticeVideo] 업로드 실패:", err.response?.data || err.message);
    throw err;
  }
};
