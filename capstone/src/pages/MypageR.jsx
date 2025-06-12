import React, { useEffect, useState } from "react";
import Layout from "../components/Layout.jsx";
import Header from "../components/Header.jsx";
import styled from "styled-components";
import { fetchInterviewVideos } from "../api/mypageApi";
import InterviewVideoItem from "../components/Mypage/InterviewVideoItem";

const Container = styled.div`
  padding: 40px 100px;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MyPageR = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchInterviewVideos().then(setVideos);
  }, []);

  return (
    <Layout>
      <Header />
      <Container>
        <h2>면접 연습 영상</h2>
        <ListWrapper>
          {videos.map((video, i) => (
            <InterviewVideoItem key={i} video={video} />
          ))}
        </ListWrapper>
      </Container>
    </Layout>
  );
};

export default MyPageR;
