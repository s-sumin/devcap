import React from "react";
import styled from "styled-components";

const FilterWrapper = styled.div`
  margin-bottom: 32px;
`;

const Select = styled.select`
  width: 300px;
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const VideoFilter = () => (
  <FilterWrapper>
    <Select>
      <option value="all">전체 영상</option>
      <option value="speech">발표연습 영상</option>
      <option value="interview">면접연습 영상</option>
      <option value="question">질문연습 영상</option>
    </Select>
  </FilterWrapper>
);

export default VideoFilter;
