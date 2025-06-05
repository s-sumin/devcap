import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Loading = styled.div`
  display: flex;
  width: 740px;
  height: 380px;
  padding: 54px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  border-radius: 20px;
  background: #fff;
  margin: 100px auto;
`;

const TextLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Title = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 45px;
  font-weight: 600;
`;

const QuestionText = styled.div`
  color: #8e8e8e;
  font-family: Pretendard;
  font-size: 25px;
  font-weight: 500;
  line-height: 44px;

  p {
    color: #8e48e8;
    font-size: 35px;
    font-weight: 500;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 30px;
  margin-left: 250px;
`;

const AnswerButton = styled.button`
  width: 218px;
  height: 63px;
  font-size: 22px;
  font-family: Pretendard;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  border: 1.5px solid ${({ selected }) => (selected ? "#8E48E8" : "#CCB0F0")};
  background: ${({ selected }) => (selected ? "#8E48E8" : "#FFF")};
  color: ${({ selected }) => (selected ? "#FFF" : "#000")};
  transition: all 0.2s;

  &:hover {
    background: #8E48E8;
    color: #FFF;
  }
`;


const PracFinish = ({ videoTitle, file, type, resumeId, speechId, videoId }) => {

  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (choice) => {
    setSelected(choice);

    // 0.3초 뒤에 페이지 이동
    setTimeout(() => {
      if (choice === "yes") {
        navigate("/question", {
          state: {
            videoTitle,
            file,
            type: "speech",
            //resumeId,
            speechId,
            videoId,
          },
        });
      } else {
        navigate("/"); // 홈으로
      }
    }, 300);
  };

  return (

    <Loading>
      <TextLayout>
        <Title>발표가 완료되었습니다.</Title>
        <QuestionText>
          <p>질문을 받으시겠습니까?</p>
          (질문을 받지 않을 시 바로 분석 화면으로 넘어갑니다.)
        </QuestionText>
        <ButtonContainer>
          <AnswerButton
            selected={selected === "yes"}
            onClick={() => handleSelect("yes")}
          >
            네
          </AnswerButton>
          <AnswerButton
            selected={selected === "no"}
            onClick={() => handleSelect("no")}
          >
            아니요
          </AnswerButton>
        </ButtonContainer>
      </TextLayout>
    </Loading>

  );
};
export default PracFinish;
