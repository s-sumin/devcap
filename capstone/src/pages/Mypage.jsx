import React from "react";
import Layout from "../components/Layout.jsx";
import Header from "../components/Header";
import VideoFilter from "../components/Mypage/VideoFilter.jsx";
import VideoList from "../components/Mypage/VideoList.jsx";
import styled from "styled-components";

const Container = styled.div`
  padding: 40px 100px;
`;

const MyPage = () => {
  return (
    <Layout>
      <Header />
      <Container>
        <VideoFilter />
        <VideoList />
      </Container>
    </Layout>
  );
};

export default MyPage;
