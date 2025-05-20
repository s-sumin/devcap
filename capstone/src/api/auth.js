// src/api/auth.js
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

if (!API) {
  console.error("❌ REACT_APP_API_URL 환경변수가 설정되지 않았습니다.");
}

// ✅ 로그인 요청
export const login = async (email, password) => {
  const url = `${API}/api/auth/login`;
  console.log("🔐 Login 요청 URL:", url);
  console.log("📨 요청 데이터:", { userEmail: email, userPasswd: password });

  try {
    const res = await axios.post(url, {
      userEmail: email,
      userPasswd: password,
    });

    console.log("✅ Login 응답 데이터:", res.data);

    const { accessToken, refreshToken } = res.data;
    console.log("🟢 Access Token:", accessToken);
    console.log("🟢 Refresh Token:", refreshToken);

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("❌ 로그인 실패:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ 회원가입 요청
export const register = async (data) => {
  const url = `${API}/api/auth/register`;
  console.log("📦 Register 요청 URL:", url);
  console.log("📨 요청 데이터:", data);

  try {
    const res = await axios.post(url, data);

    console.log("✅ Register 응답 데이터:", res.data);

    const { accessToken, refreshToken } = res.data;
    console.log("🟢 Access Token:", accessToken);
    console.log("🟢 Refresh Token:", refreshToken);

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("❌ 회원가입 실패:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ 토큰 재발급 요청
export const refresh = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const url = `${API}/api/auth/refresh`;

  console.log("♻️ 토큰 재발급 요청 URL:", url);
  console.log("📨 보낼 Refresh Token:", refreshToken);

  if (!refreshToken) {
    console.warn("❌ 저장된 Refresh Token이 없습니다.");
    throw new Error("RefreshToken이 존재하지 않습니다.");
  }

  try {
    const res = await axios.post(
      url,
      {},
      {
        headers: {
          "Refresh-Token": refreshToken,
        },
      }
    );

    console.log("✅ Refresh 응답 데이터:", res.data);

    const { accessToken, refreshToken: newRefreshToken } = res.data;
    console.log("🆕 재발급된 Access Token:", accessToken);
    console.log("🆕 재발급된 Refresh Token:", newRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    console.error("❌ 토큰 재발급 실패:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ 로그아웃 함수
export const logout = () => {
  console.log("🚪 로그아웃 시작...");
  const prevAccess = localStorage.getItem("accessToken");
  const prevRefresh = localStorage.getItem("refreshToken");

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("isLoggedIn");

  console.log("🧹 accessToken 제거됨:", !!prevAccess);
  console.log("🧹 refreshToken 제거됨:", !!prevRefresh);
  console.log("✅ 로그아웃 완료");
};
