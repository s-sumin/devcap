import styled from "styled-components";

const Input = styled.input`
  width: 600px;
  height: 40px;
  padding: 16px 18px;
  margin-bottom: 30px;
  margin-top: 10px;
  font-size: 25px;
  border: 1.5px solid ${({ $error }) => ($error ? "#ff4d4f" : "#ccc")};
  border-radius: 8px;
  margin-left: 320px;

  &:focus {
    outline: none;
    border-color: #8321FF;
  }
`;

export default Input;
