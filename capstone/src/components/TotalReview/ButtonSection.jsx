import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  position: absolute;
  width: 364px;
  height: 70px;
  bottom: 60px;
  right: 150px;
  background-color: #8321FF;
  color: white;
  border: none;
  padding: 14px 50px 14px 50px;
  font-family: Pretendard;
  font-size: 28px;
  font-weight: 500;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #6f1edc;
  }
`;

const ButtonSection = () => {
  const navigate = useNavigate();
  return <Button onClick={() => navigate("/")}>홈으로 돌아가기</Button>;
};

export default ButtonSection;
