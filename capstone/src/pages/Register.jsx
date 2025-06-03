import React, { useState } from "react";
import styled from "styled-components";
import RegisterStep1 from "../components/Register/RegisterStep1";
import RegisterStep2 from "../components/Register/RegisterStep2";
import Layout from "../components/Layout";
import BackgroundImage from "../assets/images/backimage1.png";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { setTokens } from "../utils/token";

// 전체 화면 배경 이미지
const FullPageBackground = styled.div`

  background: url(${BackgroundImage}) center center / cover no-repeat;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

   &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(204, 176, 240, 0.4); /* 💜 보라색 오버레이 */
    z-index: 0;
  }
`;

// 폼 컨테이너
const FormWrapper = styled.div`
  background: white;
  width: 1265px;
  height: 1080px;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    userName: "",
    userGender: "",
    userEmail: "",
    userMobile: "",
    userBirth: "",
    userPasswd: "",
    userPasswdConfirm: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const requestData = {
      userName: form.userName,
      userGender: form.userGender,
      userEmail: form.userEmail,
      userMobile: form.userMobile,
      userBirth: form.userBirth,
      userPasswd: form.userPasswd,
    };

    try {
      const { accessToken, refreshToken } = await register(requestData);
      alert("회원가입이 완료되었습니다!");
      setTokens(accessToken, refreshToken);
      navigate("/login");
    } catch (err) {
      if (err.response?.status === 409) {
        alert("이미 등록된 이메일입니다.");
      } else {
        console.error("❌ 회원가입 실패:", err);
        alert("회원가입에 실패했습니다.");
      }
    }
  };

  return (
    <Layout>
      <FullPageBackground>
        <FormWrapper>
          {step === 1 ? (
            <RegisterStep1
              form={form}
              onChange={handleChange}
              onNext={() => setStep(2)}
            />
          ) : (
            <RegisterStep2
              form={form}
              onChange={handleChange}
              onBack={() => setStep(1)}
              onRegister={handleRegister}
            />
          )}
        </FormWrapper>
      </FullPageBackground>
    </Layout>
  );
};

export default Register;
