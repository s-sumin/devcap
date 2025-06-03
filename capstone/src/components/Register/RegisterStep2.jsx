import React, { useState } from "react";
import styled from "styled-components";
import eyeIcon from "../../assets/images/eye.png";
import eyeOffIcon from "../../assets/images/eye-off.png";

import Logo from "../common/Logo";
import Title from "../common/Title";
import Label from "../common/Label";
import Input from "../common/Input";
import Button from "../common/Button";
import Error from "../common/Error";

const Container = styled.div`
  width: 500px;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const BackButton = styled(Button)`
  background-color: #ccc;
  color: black;
  &:hover {
    background-color: #bbb;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 25px;
  right: -420px;
  background: none;
  border: none;
  cursor: pointer;
`;

const EyeIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const RegisterStep2 = ({ form, onChange, onBack, onRegister }) => {
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!emailRegex.test(form.userEmail)) {
      newErrors.userEmail = "이메일 형식이 올바르지 않습니다.";
    }
    if (!pwRegex.test(form.userPasswd)) {
      newErrors.userPasswd = "영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.";
    }
    if (form.userPasswd !== form.userPasswdConfirm) {
      newErrors.userPasswdConfirm = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterClick = () => {
    if (validate()) {
      onRegister();
    }
  };

  return (
    <Container>
      <Logo>SpiCoach</Logo>
      <Title>Sign up</Title>

      <Label>이메일</Label>
      <InputWrapper>
        <Input
          name="userEmail"
          type="email"
          placeholder="이메일을 입력해주세요"
          value={form.userEmail}
          onChange={onChange}
          $error={errors.userEmail}
        />
      </InputWrapper>
      {errors.userEmail && <Error>{errors.userEmail}</Error>}

      <Label>비밀번호</Label>
      <InputWrapper>
        <Input
          type={showPw ? "text" : "password"}
          name="userPasswd"
          placeholder="비밀번호를 입력해주세요"
          value={form.userPasswd}
          onChange={onChange}
          $error={errors.userPasswd}
        />
        <ToggleButton type="button" onClick={() => setShowPw(!showPw)}>
          <EyeIcon src={showPw ? eyeIcon : eyeOffIcon} alt="비밀번호 보기" />
        </ToggleButton>
      </InputWrapper>
      {errors.userPasswd && <Error>{errors.userPasswd}</Error>}

      <Label>비밀번호 확인</Label>
      <InputWrapper>
        <Input
          type={showConfirm ? "text" : "password"}
          name="userPasswdConfirm"
          placeholder="비밀번호를 한번 더 입력해주세요"
          value={form.userPasswdConfirm}
          onChange={onChange}
          $error={errors.userPasswdConfirm}
        />
        <ToggleButton type="button" onClick={() => setShowConfirm(!showConfirm)}>
          <EyeIcon src={showConfirm ? eyeIcon : eyeOffIcon} alt="비밀번호 보기" />
        </ToggleButton>
      </InputWrapper>
      {errors.userPasswdConfirm && <Error>{errors.userPasswdConfirm}</Error>}

      <Button onClick={handleRegisterClick}>회원가입</Button>
      <BackButton onClick={onBack}>이전</BackButton>
    </Container>
  );
};

export default RegisterStep2;
