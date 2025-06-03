import React from "react";
import VideoItem from "./VideoItem";

const dummyVideos = [
  { date: "2025년 05월 07일", title: "캡스톤 1차 발표 연습" },
  { date: "2025년 05월 07일", title: "캡스톤 1차 질문 영상" },
  { date: "2025년 05월 05일", title: "카카오 면접 연습" },
  { date: "2025년 05월 05일", title: "논문 발표 연습" },
];

const VideoList = () => (
  <>
    {dummyVideos.map((video, idx) => (
      <VideoItem key={idx} date={video.date} title={video.title} />
    ))}
  </>
);

export default VideoList;
