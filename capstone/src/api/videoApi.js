// src/api/videoApi.js
import axiosInstance from "./axiosInstance";

// ✅ 공통 업로드 함수
const uploadVideo = async ({ videoBlob, videoTitle, saveType, id }) => {
  const formData = new FormData();
  formData.append("file", videoBlob, `${videoTitle || "recording"}.webm`);
  formData.append("type", saveType); // resume, speech, answer 중 하나
  formData.append("id", id);         // ✅ id 포함

  try {
    const res = await axiosInstance.post("/api/videos/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ [uploadVideo] 업로드 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ [uploadVideo] 업로드 실패:", err.response?.data || err.message);
    throw err;
  }
};

// ✅ 업로드 타입별 wrapper 함수
export const uploadPracticeVideo = (args) =>
  uploadVideo({ ...args, saveType: args.type === "interview" ? "resume" : "speech" });

export const uploadAnswerVideo = (args) =>
  uploadVideo({ ...args, saveType: "answer" });

export const uploadResumeVideo = (args) =>
  uploadVideo({ ...args, saveType: "resume" });
