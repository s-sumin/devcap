import React from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";

const Wrapper = styled.div`
  margin-top: 20px;
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
  font-size: 16px;
  color: #333;
  line-height: 1.6;
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
      <List>
        {feedbacks.map((item, idx) => (
          <Item key={idx}>
            <CheckIcon />
            {item}
          </Item>
        ))}
      </List>
    </Wrapper>
  );
};

export default ReviewFeedbackList;
