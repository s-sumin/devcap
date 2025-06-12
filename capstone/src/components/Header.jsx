// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const HeaderWrapper = styled.header`
  width: 1920px;
  height: 114px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 1720px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 100px;
`;

const Logo = styled(Link)`
  font-family: 'Newsreader', serif;
  font-size: 40px;
  font-weight: 700;
  color: #8321FF;
  letter-spacing: -0.4px;
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  gap: 40px;
  align-items: center;

  a, button, select {
    font-family: Pretendard;
    font-size: 26px;
    font-weight: 600;
    color: #333;
    background: none;
    border: none;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      color: #7209b7;
    }
  }

  select {
    padding: 4px 8px;
    border-radius: 8px;
    border: none;
    font-size: 25px;
  }
`;

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(checkLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleMypageChange = (e) => {
    const value = e.target.value;
    if (value === "resume") {
      navigate("/mypageR");
    } else if (value === "speech") {
      navigate("/mypageS");
    }
  };

  return (
    <HeaderWrapper>
      <InnerContainer>
        <Logo to="/">SpiCoach</Logo>
        <Nav>
          <Link to="/">Home</Link>
          <select defaultValue="" onChange={handleMypageChange}>
            <option value="" disabled>My Page</option>
            <option value="resume">면접</option>
            <option value="speech">발표</option>
          </select>
          {isLoggedIn ? (
            <button onClick={handleLogout}>로그아웃</button>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </Nav>
      </InnerContainer>
    </HeaderWrapper>
  );
};

export default Header;
