import React, { useEffect, useState } from "react";
import Layout from "../components/Layout.jsx";
import Header from "../components/Header.jsx";
import VideoList from "../components/MypageR/VideoList.jsx";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  padding: 40px 100px;
`;

const MyPageR = () => {
  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    axios.get("/api/mypage/videos", {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
    })
      .then((res) => setVideos(res.data))
      .catch((err) => console.error("🚫 영상 불러오기 실패:", err));
  }, []);

  const filteredVideos = videos.filter(video => {
    if (filter === "all") return true;
    return video.type === filter;
  });

  return (
    <Layout>
      <Header />
      <Container>
        <VideoList videos={filteredVideos} />
      </Container>
    </Layout>
  );
};

export default MyPageR;
