import React from "react";
import Layout from "../components/Layout.jsx";
import Header from "../components/Header.jsx";
import Uploadbox from "../components/Uploadbox.jsx";
import styled from "styled-components";
import BackgroundImage from "../assets/images/backimage1.png";

// 배경 전체
const Background = styled.div`
  position: relative;
  height: 1106px;
  overflow: hidden;
`;

// 배경 이미지
const BackgroundImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${BackgroundImage}) center center / cover no-repeat;
  opacity: 0.56;
  z-index: 0;
`;

// 실제 콘텐츠
const Foreground = styled.div`
  position: relative;
  z-index: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%; /* 가운데 정렬을 위해 전체 높이 지정 */
`;

const Content = styled.div`
  text-align: center;
  font-family: Pretendard;
  font-size: 42px;
  font-weight: 700;
  line-height: 68px;
  color: #000;
`;

const Title = styled.h1`
  color: var(--Black, #000);
text-align: center;
font-feature-settings: 'liga' off, 'clig' off;
font-family: Pretendard;
font-size: 42px;
font-style: normal;
font-weight: 700;
line-height: 68px; /* 161.905% */
margin-top: 72px;
`;

const SubTitle = styled.p`
  color: var(--Neutral-neutral_700, #393939);
text-align: center;
font-feature-settings: 'liga' off, 'clig' off;
font-family: Pretendard;
font-size: 30px;
font-style: normal;
font-weight: 500;
line-height: 100px; /* 357.143% */
margin-top: -40px;
`;

const Home = () => {
  return (
    <Layout>
      <Header />
      <Background>
        <BackgroundImageWrapper />
        <Foreground>
          <Content>
            <Title>
              면접이나 발표처럼 중요한 순간,<br />
              말하기가 걱정되시나요?
            </Title>
            <SubTitle>
              SpiCoach가 여러분의 발표 연습을 도와드리겠습니다.
            </SubTitle>
            <Uploadbox />
          </Content>
        </Foreground>
      </Background>
    </Layout>
  );
};

export default Home;
