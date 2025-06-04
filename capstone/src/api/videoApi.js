// ✅ videoApi.js 수정: 영상 저장 타입에 따라 업로드 분기 추가
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

const getToken = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("❌ accessToken이 없습니다. 로그인이 필요합니다.");
  return token;
};

const uploadVideo = async ({ videoBlob, videoTitle, saveType }) => {
  const token = getToken();
  const formData = new FormData();

  formData.append("file", videoBlob, `${videoTitle || "recording"}.webm`);
  formData.append("type", saveType); // resume, speech, answer 중 하나

  try {
    const res = await axios.post(`${API}/api/videos/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    console.log("✅ [uploadVideo] 업로드 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ [uploadVideo] 업로드 실패:", err.response?.data || err.message);
    throw err;
  }
};

export const uploadPracticeVideo = (args) => uploadVideo({ ...args, saveType: args.type === "interview" ? "resume" : "speech" });
export const uploadAnswerVideo = (args) => uploadVideo({ ...args, saveType: "answer" });
export const uploadResumeVideo = (args) => uploadVideo({ ...args, saveType: "resume" });
