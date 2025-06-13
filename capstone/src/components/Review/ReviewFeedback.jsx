// src/components/Review/ReviewFeedback.jsx
import React from 'react';
import styled from 'styled-components';
import { FaMapPin } from 'react-icons/fa';

const Container = styled.div`
  width: 95%;
  height :400px;
  margin: -20px auto 50px;
  border-radius: 30px;
  border: 2px solid #8E48E8;
  background: #F7F1FF;
  padding: 30px 40px;
`;

const SummaryTitle = styled.h3`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const SummaryList = styled.ul`
  padding-left: 20px;
  font-size: 25px;
  color: #444;
  line-height: 1.7;
  margin-bottom: 30px;
`;

const SummaryItem = styled.li`
  margin-bottom: 6px;
`;

const Timestamp = styled.div`
  display: inline-block;
  background: #8321ff;
  color: white;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 10px;
  margin: 0 0 10px 0;
  font-size: 15px;
  margin-top: 10px;
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

const TimelineWrapper = styled.div`
  margin-top: 40px;
  position: relative;
`;

const Timeline = styled.div`
  position: relative;
  margin-top:-30px;
  height: 8px;
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
const PinLabel = styled.div`
  position: absolute;
  top: -32px;
  left: 50%;
  transform: translateX(-50%);
  background: #8321ff;
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 6px;
  white-space: nowrap;
  z-index: 999;
`;


const ReviewFeedback = ({ videoRef, feedbackData = [], feedbacks = [] }) => {
  const handlePinClick = (seconds) => {
    if (videoRef?.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
    }
  };

  if (!Array.isArray(feedbackData)) return null;

  return (
    <Container>
      {/* 타임라인 */}
      <TimelineWrapper>
        <Timeline>
          {feedbackData.map((feedback, index) => (
            <div key={index} style={{ position: "absolute", left: feedback.left }}>
              <Pin
                data-time={feedback.timeLabel}
                onClick={() => handlePinClick(feedback.seconds)}
              />
              <PinLabel>{feedback.timeLabel}</PinLabel>
            </div>
          ))}
        </Timeline>
      </TimelineWrapper>

      {/* 타임스탬프 피드백 */}
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

      {/* 종합 피드백 */}
      {feedbacks.length > 0 && (
        <>
          <SummaryTitle>시간별 피드백</SummaryTitle>
          <SummaryList>
            {feedbacks.map((line, idx) => (
              <SummaryItem key={idx}>{line}</SummaryItem>
            ))}
          </SummaryList>
        </>
      )}


    </Container>
  );
};

export default ReviewFeedback;
