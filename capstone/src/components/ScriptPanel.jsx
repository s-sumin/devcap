import React from "react";
import styled from "styled-components";
import ToggleOffIcon from "../assets/icons/togglebutton.svg";
import ToggleOnIcon from "../assets/icons/togglebutton2.svg";

const PanelWrapper = styled.div`
  width: 600px;
  background: white;
  border-radius: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  padding: 32px;
  display: flex;
  flex-direction: column;
/*   justify-content: space-between;
 */`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--Primary-primary_300, #8E48E8);
  font-family: Pretendard;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const ScriptBox = styled.div`
  flex-grow: 1;
  font-size: 25px;
  line-height: 1.8;
  color: #333;
  overflow-y: auto;
  max-height: 650px;
  filter: ${({ blurred }) => (blurred ? "blur(5px)" : "none")};
  transition: filter 0.3s ease;
`;

const ToggleButton = styled.img`
  width: 60px;
  height: 50px;
  cursor: pointer;
`;

const Button = styled.button`
  margin-top: 24px;
  background: #8321FF;
  color: white;
  padding: 14px;
  font-family: Pretendard;
font-size: 28px;
font-style: normal;
font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background: #6f1edc;
  }
`;

const ScriptPanel = ({ scriptText, isBlurred, onToggleBlur, onFinish }) => {
  return (
    <PanelWrapper>
      <Header>
        발표 스크립트
        <ToggleButton
          src={isBlurred ? ToggleOnIcon : ToggleOffIcon}
          alt="스크립트 블러 토글"
          onClick={onToggleBlur}
        />
      </Header>

      <ScriptBox blurred={isBlurred}>
        {scriptText}
      </ScriptBox>

      <Button onClick={onFinish}>발표 마치기 →</Button>
    </PanelWrapper>
  );
};

export default ScriptPanel;
