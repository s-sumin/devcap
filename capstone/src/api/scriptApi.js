import axios from "axios";

// 📌 API 기본 주소
const API = process.env.REACT_APP_API_URL;

// 📌 공통 payload 준비 함수
const preparePayload = (scriptText) => {
  const token = localStorage.getItem("accessToken");
   console.log("📌 accessToken:", token);

  if (!API) {
    console.error("❌ API URL이 설정되지 않았습니다.");
    throw new Error("API URL 환경변수를 확인해주세요 (.env에 REACT_APP_API_URL 추가)");
  }

  if (!token) {
    console.error("❌ accessToken이 없습니다.");
    throw new Error("로그인이 필요합니다.");
  }

  const escapedScript = scriptText.replace(/\n/g, "\\n");

  const payload = {
    scripts: escapedScript,
  };

  return { token, payload };
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

// ✅ 발표용 스크립트 업로드 함수 (/api/speech/upload)
export const uploadSpeechScript = async (scriptText) => {
  const { token, payload } = preparePayload(scriptText);

  try {
    const res = await axios.post(`${API}/api/speech/upload`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    console.log("✅ [uploadSpeechScript] 응답:", res.data);
    return res.data;
  } catch (error) {
    handleError("uploadSpeechScript", error);
    throw error;
  }
};

// ✅ 면접용 스크립트 업로드 함수 (/api/resume/upload)
export const uploadResumeScript = async (scriptText) => {
  const { token, payload } = preparePayload(scriptText);

  try {
    const res = await axios.post(`${API}/api/resume/upload`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    console.log("✅ [uploadResumeScript] 응답:", res.data);
    return res.data;
  } catch (error) {
    handleError("uploadResumeScript", error);
    throw error;
  }
};
