// src/pages/Login.jsx
import React from "react";
import styled from "styled-components";
import BackgroundImage from "../assets/images/backimage2.png";
import LoginForm from "../components/Login/LoginForm.jsx";
import Layout from "../components/Layout.jsx";


const LoginWrapper = styled.div`
  display: flex;
  width: 1920px;
  height: 1080px;
  flex-direction: row;
  background: var(--Primary-primary_100, #CCB0F0);
`;

const LeftImage = styled.div`
  flex: 1;
  background: url(${BackgroundImage}) center center / cover no-repeat;
  opacity: 0.7;
`;

const RightBox = styled.div`
  flex: 1;
  background: white;
  
`;

const Login = () => {
  return (
    <Layout>
      <LoginWrapper>
        <LeftImage />
        <RightBox>
          <LoginForm />
        </RightBox>
      </LoginWrapper>
    </Layout>

  );
};

export default Login;
