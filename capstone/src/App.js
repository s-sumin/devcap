// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Mypage from "./pages/Mypage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Practice from "./pages/Practice.jsx";
import Question from "./pages/Question.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/question" element={<Question />} />

      </Routes>
    </Router>
  );
}

export default App;
