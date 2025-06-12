// src/api/detailReportApi.js
import axiosInstance from "./axiosInstance";

export const fetchDetailedReport = async ({ id, type }) => {
  try {
    const endpoint =
      type === "speech"
        ? "/api/report/detail/speech"
        : "/api/report/detail/interview";

    const response = await axiosInstance.get(endpoint, {
      params: { id },
    });

    console.log("✅ [fetchDetailedReport] 응답:", response.data);

    return {
      title: response.data.title,
      date: response.data.date,
      hlsUrl: response.data.hlsUrl,
      feedbacks: Array.isArray(response.data.feedback)
        ? response.data.feedback
        : [response.data.feedback], // 단일 문자열 대응
    };
  } catch (err) {
    console.error("❌ [fetchDetailedReport] 실패:", err.response?.data || err.message);
    throw err;
  }
};
