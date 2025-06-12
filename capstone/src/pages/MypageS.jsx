import React, { useEffect, useState } from "react";
import Layout from "../components/Layout.jsx";
import Header from "../components/Header.jsx";
import styled from "styled-components";
import { fetchSpeechVideos } from "../api/mypageApi";
import SpeechVideoItem from "../components/Mypage/SpeechVideoItem";

const Container = styled.div`
  padding: 40px 100px;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MyPageS = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchSpeechVideos().then(setVideos);
  }, []);

  return (
    <Layout>
      <Header />
      <Container>
        <h2>발표 연습 영상</h2>
        <ListWrapper>
          {videos.map((video, i) => (
            <SpeechVideoItem key={i} video={video} />
          ))}
        </ListWrapper>
      </Container>
    </Layout>
  );
};

export default MyPageS;
