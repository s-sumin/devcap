import React from 'react';
import styled from 'styled-components';

const LogoText = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #7209b7; /* SpiCoach 보라색 계열 */
`;

const Logo = () => {
  return <LogoText>SpiCoach</LogoText>;
};

export default Logo;
