import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import SpeechVideoList from "../components/MypageS/SpeechVideoList";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  padding: 40px 100px;
`;

const MyPageS = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get("/api/mypage/getspeech", {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
    })
    .then(res => setVideos(res.data))
    .catch(err => console.error("🚫 발표 영상 불러오기 실패:", err));
  }, []);

  return (
    <Layout>
      <Header />
      <Container>
        <h1>발표 연습 영상</h1>
        <SpeechVideoList videos={videos} />
      </Container>
    </Layout>
  );
};

export default MyPageS;
