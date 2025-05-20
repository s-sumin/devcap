import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { setTokens } from "../utils/token";
import eyeIcon from "../assets/images/eye.png";
import eyeOffIcon from "../assets/images/eye-off.png";

const Form = styled.div`
  width: 100%;
  max-width: 400px;
`;

const Logo = styled.div`
  color: #8321FF;
  font-family: Newsreader;
  font-size: 38px;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: -0.38px;
  margin: 103px auto auto 180px;
`;

const Title = styled.h1`
  height: 121px;
  width: 271px;
  color: #000;
  font-family: Pretendard;
  font-size: 80px;
  font-weight: 700;
  line-height: 68px;
  margin: 36px auto auto 180px;
`;

const Label = styled.label`
  color: #000;
  font-family: Pretendard;
  font-size: 26px;
  font-weight: 600;
  margin: 44px auto auto 180px;
`;

const Input = styled.input`
  width: 600px;
  height: 40px;
  padding: 16px 18px;
  margin-bottom: 30px;
  margin-top: 10px;
  margin-left: 180px;
  font-size: 25px;
  border: 1.5px solid ${({ $error }) => ($error ? "#ff4d4f" : "#ccc")};
  border-radius: 8px;

  &:focus {
    outline: none;
    border-color: #8321FF;
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const ToggleButton = styled.button`
position: absolute;
margin-top: -87px;
margin-left: 730px;
  background: none;
  border: none;
  cursor: pointer;
`;

const EyeIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const ErrorText = styled.div`
  width: 600px;
  color: #ff4d4f;
  font-size: 20px;
  margin-left: 180px;
  margin-top: -20px;
  margin-bottom: 12px;
`;

const LoginButton = styled.button`
  width: 640px;
  background: #8321FF;
  color: white;
  border: none;
  padding: 14px 0;
  font-size: 25px;
  font-weight: 600;
  border-radius: 8px;
  margin-left: 180px;
  margin-top: 20px;

  &:hover {
    background: #6f1edc;
  }
`;

const SubActions = styled.div`
  width: 600px;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 88px;
  margin-left: 320px;

  a {
    margin: 0 8px;
    color: #8321FF;
    text-decoration: none;
  }
`;

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !pw) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const { accessToken, refreshToken } = await login(email, pw);

      console.log("✅ 로그인 성공!");
      console.log("🧾 받은 accessToken:", accessToken);
      console.log("🧾 받은 refreshToken:", refreshToken);

      setTokens(accessToken, refreshToken);
      localStorage.setItem("isLoggedIn", "true");

      // 저장이 제대로 되었는지 확인
      console.log("💾 저장된 accessToken:", localStorage.getItem("accessToken"));
      console.log("💾 저장된 refreshToken:", localStorage.getItem("refreshToken"));

      navigate("/");
    } catch (err) {
      console.error("❌ 로그인 실패:", err);
      setError("이메일 또는 비밀번호가 잘못되었습니다.");
    }
  };


  return (
    <Form>
      <Logo>SpiCoach</Logo>
      <Title>Sign In</Title>

      <Label>이메일</Label>
      <Input
        type="email"
        placeholder="이메일을 입력해주세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        $error={!!error}
      />

      <Label>비밀번호</Label>
      <PasswordWrapper>
        <Input
          type={showPw ? "text" : "password"}
          placeholder="비밀번호를 입력해주세요"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          $error={!!error}
        />
        <ToggleButton type="button" onClick={() => setShowPw(!showPw)}>
          <EyeIcon src={showPw ? eyeIcon : eyeOffIcon} alt="비밀번호 보기 전환" />
        </ToggleButton>
      </PasswordWrapper>

      {error && <ErrorText>{error}</ErrorText>}

      <LoginButton onClick={handleLogin}>로그인</LoginButton>

      <SubActions>
        아직 계정이 없으신가요?
        <Link to="/register">회원가입</Link>
      </SubActions>
    </Form>
  );
};

export default LoginForm;
