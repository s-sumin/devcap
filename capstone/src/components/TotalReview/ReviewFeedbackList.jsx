import React from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";

const Wrapper = styled.div`
  margin-top: 20px;
`;
const ScrollContainer = styled.div`
  max-height: 700px; /* ✅ 필요에 따라 조절 가능 */
  overflow-y: auto;
  padding-right: 10px;

  /* 스크롤바 스타일 (선택사항) */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;
const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Item = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 22px;
  color: #333;
  line-height: 1.6;
  white-space: pre-wrap; /* ✅ 줄바꿈 보존 */
  margin-top: -45px;
  margin-left:-30px;
`;

const CheckIcon = styled(FaCheck)`
  color: #8321FF;
  margin-top: 4px;
  min-width: 16px;
`;

const Empty = styled.div`
  color: #888;
  font-size: 15px;
  margin-top: 20px;
`;

const ReviewFeedbackList = ({ feedbacks }) => {
  if (!feedbacks || feedbacks.length === 0) {
    return (
      <Wrapper>
        <Empty>아직 피드백이 없습니다.</Empty>
      </Wrapper>
    );
  }

   return (
    <Wrapper>
      <ScrollContainer>
        <List>
          {feedbacks.map((item, idx) => (
            <Item key={idx}>
              <CheckIcon />
              {item}
            </Item>
          ))}
        </List>
      </ScrollContainer>
    </Wrapper>
  );
};

export default ReviewFeedbackList;
