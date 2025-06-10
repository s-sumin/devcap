import React from 'react';
import styled from 'styled-components';
import { FaMapPin } from 'react-icons/fa';

const Container = styled.div`
  width: 90%;
  height: 300px;
  margin: 50px auto;
  border-radius: 30px;
  border: 2px solid var(--Primary-primary_300, #8E48E8);
  background: var(--Primary-primary_050, #F7F1FF);
  padding: 30px 30px 60px 30px;
  position: relative;
`;

const Timeline = styled.div`
  position: relative;
  height: 12px;
  background: #d8c4ff;
  border-radius: 10px;
  margin-bottom: 50px;
`;

const Pin = styled(FaMapPin)`
  position: absolute;
  top: -14px;
  transform: translateX(-50%);
  color: #8321ff;
  cursor: pointer;

  &:hover::after {
    content: attr(data-time);
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    background: #8321ff;
    color: white;
    padding: 4px 8px;
    font-size: 12px;
    border-radius: 6px;
    white-space: nowrap;
  }
`;

const Timestamp = styled.div`
  display: inline-block;
  background: #8321ff;
  color: white;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 10px;
  margin-bottom: 15px;
  font-size: 14px;
`;

const FeedbackList = styled.ul`
  margin-top: 10px;
  padding-left: 18px;
  font-size: 30px;
  color: #333;
`;

const FeedbackContent = styled.li`
  margin-bottom: 10px;
  line-height: 1.6;
`;

const Thumbnail = styled.div`
  position: absolute;
  top: -30px;
  left: 20px;
  width: 80px;
  height: 60px;
  background: #ccc;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid white;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ReviewFeedback = ({ videoRef }) => {
  const feedbackData = [
    {
      timeLabel: '00:30',
      seconds: 30,
      left: '15%',
      comments: ['“그래서”라는 단어가 반복되고 있습니다.']
    },
    {
      timeLabel: '01:10',
      seconds: 70,
      left: '40%',
      comments: ['문장이 길어져서 집중도가 떨어질 수 있습니다.']
    },
    {
      timeLabel: '02:00',
      seconds: 120,
      left: '75%',
      comments: ['목소리의 크기가 일정하지 않습니다.']
    }
  ];

  const handlePinClick = (seconds) => {
    if (videoRef?.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
    }
  };

  return (
    <Container>
      <Thumbnail>
        <video src="/sample.mp4" muted autoPlay loop />
      </Thumbnail>

      <Timeline>
        {feedbackData.map((feedback, index) => (
          <Pin
            key={index}
            style={{ left: feedback.left }}
            data-time={feedback.timeLabel}
            onClick={() => handlePinClick(feedback.seconds)}
          />
        ))}
      </Timeline>

      {/* 첫 번째 피드백 영역 표시 */}
      <Timestamp>{feedbackData[0].timeLabel}</Timestamp>
      <FeedbackList>
        {feedbackData[0].comments.map((text, idx) => (
          <FeedbackContent key={idx}>{text}</FeedbackContent>
        ))}
      </FeedbackList>
    </Container>
  );
};

export default ReviewFeedback;
