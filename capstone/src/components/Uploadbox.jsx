import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { uploadResumeScript, uploadSpeechScript } from '../api/scriptApi';

import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";

import PlusIcon from '../assets/icons/plus.svg';
import InterviewIcon from '../assets/icons/interview.svg';
import SpeechIcon from '../assets/icons/speech.svg';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const UploadBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;

const UploadBox = styled.div`
  display: flex;
  width: 1000px;
  height: 280px;
  padding: 70px 310px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 30px;
  background: #f7f1ff;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.15);
  margin-top: -40px;
  border: 4px dashed #ccb0f0;
  cursor: pointer;
`;

const PlusImage = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 8px;
`;

const UploadText = styled.p`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 26px;
  font-weight: 600;
  line-height: 46px;
`;

const S3LoadNotice = styled.p`
  margin-top: 20px;
  font-size: 30px;
  color: #555;
  text-align: center;

  span {
    color: #8e48e8;
    font-weight: 600;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: #6f1edc;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 150px;
`;

const ActionButton = styled.button`
  padding: 15px 90px;
  background: #8e48e8;
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px 60px;
  text-align: center;
  font-size: 26px;
  font-weight: 600;
  font-family: Pretendard;
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
`;

const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 30px;
`;

const Uploadbox = () => {
  const fileInputRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [scriptText, setScriptText] = useState("");

  const navigate = useNavigate();

  const handleUploadBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  setUploadedFile(file);
  setShowModal(true);

  const fileExt = file.name.split('.').pop().toLowerCase();

  if (fileExt === "txt") {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      console.log("📄 TXT 내용:", text);
       setScriptText(text);
    };
    reader.readAsText(file);
  }

  else if (fileExt === "docx") {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    console.log("📄 DOCX 내용:", result.value);
    setScriptText(result.value);
  }

  else if (fileExt === "pdf") {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map(item => item.str).join(" ");
      fullText += pageText + "\n";
    }

    console.log("📄 PDF 내용:", fullText);
     setScriptText(fullText);
  }

  else if (fileExt === "hwp") {
    alert("📄 HWP 파일은 브라우저에서 직접 읽을 수 없어 서버에서 처리해야 합니다.");
    // TODO: 서버 업로드 후 파싱 API 호출
  }

  else {
    alert("❗ 지원되지 않는 파일 형식입니다.");
  }
};

  const handleSelectType = (type) => {
    setSelectedType(type);
    setShowModal(false);
  };

const handleFinalNavigate = async () => {
  if (!uploadedFile || !selectedType) {
    alert("파일과 용도를 선택해주세요.");
    return;
  }

  const token = localStorage.getItem("accessToken");
  if (!token) {
    alert("로그인이 필요합니다.");
    navigate("/login");
    return;
  }

  try {
    const uploadData = {
      userId: 1, // TODO: 로그인된 유저 ID로 교체
      title: uploadedFile.name,
      file: uploadedFile,
      scripts: scriptText,
    };

    let response;
    let stateData = {
      file: uploadedFile,
      type: selectedType,
      videoTitle: uploadedFile.name,
      scriptText: scriptText,
    };

    if (selectedType === "interview") {
      response = await uploadResumeScript(uploadData);
      console.log("📦 면접 업로드 응답:", response); // ✅ 추가
      stateData.resumeId = response.resumeId;
      navigate("/question", { state: stateData });
    } else {
      response = await uploadSpeechScript(uploadData);
      console.log("📦 발표 업로드 응답:", response); // ✅ 추가
      stateData.speechId = response.speechId;
      navigate("/practice", { state: stateData });
    }

    console.log("🚀 다음 페이지로 넘기는 state:", stateData); // ✅ 추가

    
  } catch (err) {
    console.error("🚫 업로드 실패:", err);
    alert("스크립트 업로드 실패");
  }
};


  const handleLoadFromS3 = () => {
    alert("S3에서 파일 불러오기 기능은 아직 구현되지 않았습니다.");
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
            <div className="upload-success">업로드 준비 완료</div>
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

      <S3LoadNotice>
        이미 업로드한 파일이 있다면{" "}
        <span onClick={handleLoadFromS3}>여기를 클릭해주세요</span>
      </S3LoadNotice>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            이 스크립트는 어떤 용도인가요?
            <ModalButtonWrapper>
              <ActionButton onClick={() => handleSelectType("interview")}>
                <Icon src={InterviewIcon} alt="interview" />
                면접
              </ActionButton>
              <ActionButton onClick={() => handleSelectType("speech")}>
                <Icon src={SpeechIcon} alt="speech" />
                발표
              </ActionButton>
            </ModalButtonWrapper>
          </ModalContent>
        </ModalOverlay>
      )}

      <ButtonGroup>
        <ActionButton
          onClick={handleFinalNavigate}
          disabled={!uploadedFile || selectedType !== "interview"}
        >
          <Icon src={InterviewIcon} alt="interview" />
          면접
        </ActionButton>
        <ActionButton
          onClick={handleFinalNavigate}
          disabled={!uploadedFile || selectedType !== "speech"}
        >
          <Icon src={SpeechIcon} alt="speech" />
          발표
        </ActionButton>
      </ButtonGroup>
    </UploadBoxWrapper>
  );
};

export default Uploadbox;
