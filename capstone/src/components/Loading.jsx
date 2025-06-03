// src/components/Loading.jsx
import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  padding: 40px 60px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #8E48E8;
`;

const Description = styled.p`
  font-size: 18px;
  color: #444;
`;

const Spinner = styled.div`
  margin: 20px auto;
  width: 80px;
  height: 80px;
  border: 8px solid #f3f3f3;
  border-top: 8px solid #8E48E8;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const Loading = () => {
  return (
    <Overlay>
      <Modal>
        <Title><strong>SpiCoach</strong>가 분석중입니다...</Title>
        <Spinner />
        <Description>
          응답을 분석해 최적화된 피드백을 드리기 위해 최대 3분 정도 소요될 수 있습니다. <br />
          잠시만 기다려주세요.
        </Description>
      </Modal>
    </Overlay>
  );
};

export default Loading;
