import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/CustomDatePicker.css";

import Logo from "../common/Logo";
import Title from "../common/Title";
import Label from "../common/Label";
import Input from "../common/Input";
import Button from "../common/Button";
import Error from "../common/Error";

const StyledDatePicker = styled(DatePicker)`
  width: 600px;
  height: 50px;
  padding: 16px 18px;
  font-size: 20px;
  border: 1.5px solid ${({ $error }) => ($error ? "#ff4d4f" : "#ccc")};
  border-radius: 8px;
  margin-left: 320px;
  margin-top: 10px;
  margin-bottom: 30px;

  &:focus {
    outline: none;
    border-color: #8321FF;
  }
`;

const Select = styled.select`
  width: 640px;
  height: 80px;
  margin-bottom: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 25px;
  margin-left: 320px;
`;

const SubLink = styled.div`
  width: 600px;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 500;
  margin-top: 16px;
  margin-left: 490px;

  a {
    color: #8321FF;
    text-decoration: none;
    margin-left: 6px;
  }
`;

const Container = styled.div`
  width: 500px;
`;

const RegisterStep1 = ({ form, onChange, onNext }) => {
  const [errors, setErrors] = useState({});
  const [selectedDate, setSelectedDate] = useState(form.userBirth ? new Date(form.userBirth) : null);

  const validate = () => {
    const newErrors = {};
    if (!form.userName.trim()) newErrors.userName = "이름을 입력해주세요.";
    if (!form.userBirth) newErrors.userBirth = "생년월일을 선택해주세요.";
    if (!form.userGender) newErrors.userGender = "성별을 선택해주세요.";
    if (!form.userMobile.trim()) newErrors.userMobile = "전화번호를 입력해주세요.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <Container>
      <Logo>SpiCoach</Logo>
      <Title>Sign up</Title>

      <Label>이름</Label>
      <Input
        name="userName"
        placeholder="이름을 입력해주세요"
        value={form.userName}
        onChange={onChange}
        $error={errors.userName}
      />
      {errors.userName && <Error>{errors.userName}</Error>}

      <Label>생년월일</Label>
      <StyledDatePicker
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          onChange({ target: { name: "userBirth", value: date?.toISOString().slice(0, 10) } });
        }}
        dateFormat="yyyy-MM-dd"
        placeholderText="YYYY-MM-DD"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        $error={errors.userBirth}
      />
      {errors.userBirth && <Error>{errors.userBirth}</Error>}

      <Label>성별</Label>
      <Select name="userGender" value={form.userGender} onChange={onChange}>
        <option value="">성별 선택</option>
        <option value="male">남자</option>
        <option value="female">여자</option>
      </Select>
      {errors.userGender && <Error>{errors.userGender}</Error>}

      <Label>전화번호</Label>
      <Input
        name="userMobile"
        placeholder="전화번호를 입력해주세요"
        value={form.userMobile}
        onChange={onChange}
        $error={errors.userMobile}
      />
      {errors.userMobile && <Error>{errors.userMobile}</Error>}

      <Button onClick={handleNextClick}>다음</Button>

      <SubLink>
        계정이 있으신가요? <Link to="/login">로그인</Link>
      </SubLink>
    </Container>
  );
};

export default RegisterStep1;
