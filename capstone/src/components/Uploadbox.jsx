// src/components/Uploadbox.jsx
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { uploadScript } from '../api/scriptApi';

import PlusIcon from '../assets/icons/plus.svg';
import InterviewIcon from '../assets/icons/interview.svg';
import SpeechIcon from '../assets/icons/speech.svg';

const UploadBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;

const UploadBox = styled.div`
  display: flex;
  width: 1000px;
  height: 350px;
  padding: 70px 310px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 30px;
  background: #F7F1FF;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.15);
  margin-top: -40px;
  border: 4px dashed var(--Primary-primary_100, #CCB0F0);
  cursor: pointer;
`;

const PlusImage = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 8px;
`;

const UploadText = styled.p`
  color: var(--Black, #000);
  text-align: center;
  font-family: Pretendard;
  font-size: 26px;
  font-weight: 600;
  line-height: 46px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 150px;
  margin: 24px auto auto auto;
`;

const ActionButton = styled.button`
  padding: 15px 90px;
  background: var(--Primary-primary_300, #8E48E8);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 30px;
  font-weight: 500;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 30px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #6f1edc;
  }
`;

const Icon = styled.img`
  width: 35px;
  height: 35px;
`;

const Uploadbox = () => {
  const fileInputRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const navigate = useNavigate();

  const handleUploadBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);

      // 파일 텍스트 읽기
      const reader = new FileReader();
      reader.onload = async (e) => {
        const scriptText = e.target.result;

        try {
          // API 요청
          await uploadScript(scriptText);
          console.log("✅ 서버 업로드 완료");
        } catch (err) {
          console.error("🚫 업로드 중 오류 발생", err);
          alert("스크립트 업로드 실패");
        }
      };

      reader.readAsText(file);
    }
  };

  const handleGoToPractice = (type) => {
    if (!uploadedFile) {
      alert("먼저 파일을 업로드해주세요.");
      return;
    }

    navigate("/practice", {
      state: {
        file: uploadedFile,
        type: type, // "interview" 또는 "speech"
      },
    });
  };

  return (
    <UploadBoxWrapper>
      <UploadBox onClick={handleUploadBoxClick}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {uploadedFile ? (
          <div className="upload-info">
            <div className="file-name">{uploadedFile.name}</div>
            <div className="upload-success">업로드 완료!</div>
          </div>
        ) : (
          <>
            <PlusImage src={PlusIcon} alt="plus icon" />
            <UploadText>
              발표 대본 / 자기소개서(이력서) 등을 업로드한 후 <br />
              아래 버튼을 눌러주세요.
            </UploadText>
          </>
        )}
      </UploadBox>

      <ButtonGroup>
        <ActionButton onClick={() => handleGoToPractice('interview')}>
          <Icon src={InterviewIcon} alt="interview" />
          면접
        </ActionButton>
        <ActionButton onClick={() => handleGoToPractice('speech')}>
          <Icon src={SpeechIcon} alt="speech" />
          발표
        </ActionButton>
      </ButtonGroup>
    </UploadBoxWrapper>
  );
};

export default Uploadbox;
