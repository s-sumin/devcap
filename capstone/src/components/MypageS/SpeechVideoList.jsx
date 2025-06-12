import React from "react";
import styled from "styled-components";
import SpeechVideoItem from "./SpeechVideoItem";

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SpeechVideoList = ({ videos }) => {
  if (!videos || videos.length === 0) {
    return <div>저장된 발표 영상이 없습니다.</div>;
  }

  return (
    <ListWrapper>
      {videos.map((video, index) => (
        <SpeechVideoItem key={index} video={video} />
      ))}
    </ListWrapper>
  );
};

export default SpeechVideoList;
