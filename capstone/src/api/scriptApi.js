//scriptApi.js
import axios from "axios";

// 환경변수에서 API URL 가져오기
const API = process.env.REACT_APP_API_URL;

// 📌 스크립트 업로드 함수
export const uploadScript = async (scriptText) => {
  const token = localStorage.getItem("accessToken");

  // API URL 확인
  if (!API) {
    console.error("❌ [uploadScript] API URL이 설정되지 않았습니다.");
    throw new Error("API URL 환경변수를 확인해주세요 (.env에 REACT_APP_API_URL 추가)");
  }

  // 토큰 확인
  if (!token) {
    console.error("❌ [uploadScript] accessToken이 없습니다.");
    throw new Error("로그인이 필요합니다.");
  }

  // 디버깅 로그
  console.log("💬 [uploadScript] API URL:", `${API}/api/scripts/upload`);
  console.log("💬 [uploadScript] accessToken:", token);
  console.log("💬 [uploadScript] 원본 script 내용:", scriptText.slice(0, 100), "...");

  // 줄바꿈 이스케이프 처리
  const escapedScript = scriptText.replace(/\n/g, "\\n");

  // 전송 데이터 구성
  const payload = {
    scripts: escapedScript,
  };

  console.log("📦 [uploadScript] 전송 payload:", JSON.stringify(payload, null, 2));

  try {
    // Axios 요청
    const res = await axios.post(
      `${API}/api/scripts/upload`,
      payload,
      {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          "Content-Type": "application/json",
        },
        withCredentials: true,  /* 오류로 이 부분 추가*/
      }
    );

    console.log("✅ [uploadScript] 서버 응답 성공");
    console.log("📨 응답 데이터:", res.data);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error("❌ [uploadScript] 서버 응답 오류:");
      console.error("🔻 상태 코드:", error.response.status);
      console.error("🔻 응답 데이터:", error.response.data);
    } else {
      console.error("❌ [uploadScript] 네트워크 또는 기타 오류:", error.message);
    }
    throw error;
  }
};
