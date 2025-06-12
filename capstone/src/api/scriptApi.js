// src/api/scriptApi.js
import axiosInstance from "./axiosInstance";

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

// ✅ 면접용 스크립트 업로드 (/api/resume/upload)
export const uploadResumeScript = async ({ userId, title, file }) => {
  const formData = buildFormData({ userId, title, file });

  try {
    const res = await axiosInstance.post("/api/resume/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ [uploadResumeScript] 응답:", res.data);
    return res.data;
  } catch (err) {
    handleError("uploadResumeScript", err);
    throw err;
  }
};

// ✅ 발표용 스크립트 업로드 (/api/speech/upload)
export const uploadSpeechScript = async ({ userId, title, file }) => {
  const formData = buildFormData({ userId, title, file });

  try {
    const res = await axiosInstance.post("/api/speech/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ [uploadSpeechScript] 응답:", res.data);
    return res.data;
  } catch (err) {
    handleError("uploadSpeechScript", err);
    throw err;
  }
};
