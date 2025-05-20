// src/components/Layout.jsx
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 1920px;
  height: 1080px;
  margin: 0 auto;
  overflow: hidden;
  background-color: #ffffff;
  position: relative;
  border: 1px solid #000000;
`;

const Layout = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Layout;
