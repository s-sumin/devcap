//scriptApi.js
import axios from "axios";

// 📌 API 기본 주소
const API = process.env.REACT_APP_API_URL;

// 📌 토큰 가져오기
const getToken = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("❌ accessToken이 없습니다. 로그인이 필요합니다.");
  }
  return token;
};

// 📌 FormData 구성
const buildFormData = ({ userId, title, file }) => {
  const formData = new FormData();
  formData.append("user_id", userId);
  formData.append("title", title);
  formData.append("file", file);
  return formData;
};

// 📌 공통 에러 핸들링
const handleError = (label, error) => {
  if (error.response) {
    console.error(`❌ [${label}] 서버 응답 오류`);
    console.error("🔻 상태 코드:", error.response.status);
    console.error("🔻 응답 데이터:", error.response.data);
  } else {
    console.error(`❌ [${label}] 네트워크 또는 기타 오류:`, error.message);
  }
};

// ✅ 면접용 업로드 (/api/resume/upload)
export const uploadResumeScript = async ({ userId, title, file }) => {
  const token = getToken();
  const formData = buildFormData({ userId, title, file });

  try {
    const res = await axios.post(`${API}/api/resume/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    console.log("✅ [uploadResumeScript] 응답:", res.data);
    return res.data;
  } catch (err) {
    handleError("uploadResumeScript", err);
    throw err;
  }
};

// ✅ 발표용 업로드 (/api/speech/upload)
export const uploadSpeechScript = async ({ userId, title, file }) => {
  const token = getToken();
  const formData = buildFormData({ userId, title, file });

  try {
    const res = await axios.post(`${API}/api/speech/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    console.log("✅ [uploadSpeechScript] 응답:", res.data);
    return res.data;
  } catch (err) {
    handleError("uploadSpeechScript", err);
    throw err;
  }
};
