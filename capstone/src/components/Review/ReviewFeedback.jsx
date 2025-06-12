import React from 'react';
import styled from 'styled-components';
import { FaMapPin } from 'react-icons/fa';

const Container = styled.div`
  width: 90%;
  margin: 50px auto;
  border-radius: 30px;
  border: 2px solid #8E48E8;
  background: #F7F1FF;
  padding: 30px 40px;
`;

const TimelineWrapper = styled.div`
  margin-top: 40px;
  position: relative;
`;

const Timeline = styled.div`
  position: relative;
  height: 12px;
  background: #d8c4ff;
  border-radius: 10px;
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
  margin: 0 0 10px 0;
  font-size: 14px;
`;

const FeedbackList = styled.ul`
  margin-top: 0;
  padding-left: 18px;
  font-size: 17px;
  color: #333;
  line-height: 1.7;
`;

const FeedbackContent = styled.li`
  margin-bottom: 8px;
`;

const ReviewFeedback = ({ videoRef, feedbackData = [] }) => {
  const handlePinClick = (seconds) => {
    if (videoRef?.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
    }
  };

  if (!Array.isArray(feedbackData) || feedbackData.length === 0) return null;

  return (
    <Container>
      {feedbackData.map((feedback, index) => (
        <div key={index} style={{ marginBottom: '24px' }}>
          <Timestamp>{feedback.timeLabel}</Timestamp>
          <FeedbackList>
            {Array.isArray(feedback.comments) &&
              feedback.comments.map((text, idx) => (
                <FeedbackContent key={idx}>{text}</FeedbackContent>
              ))}
          </FeedbackList>
        </div>
      ))}

      <TimelineWrapper>
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
      </TimelineWrapper>
    </Container>
  );
};

export default ReviewFeedback;
