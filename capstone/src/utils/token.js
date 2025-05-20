// src/utils/token.js
export const setTokens = (accessToken, refreshToken) => {
  console.log("🟢 setTokens 호출됨");
  console.log("✅ 저장할 accessToken:", accessToken);
  console.log("✅ 저장할 refreshToken:", refreshToken);

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const getAccessToken = () => localStorage.getItem("accessToken");

export const getRefreshToken = () => localStorage.getItem("refreshToken");

export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
