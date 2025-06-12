// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import MypageR from "./pages/MypageR.jsx";
import MypageS from "./pages/MypageS.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Practice from "./pages/Practice.jsx";
import Question from "./pages/Question.jsx";
import ReviewR from "./pages/ReviewR.jsx";
import ReviewS from "./pages/ReviewS.jsx";
import TotalReview from "./pages/TotalReview.jsx";

import VideoWatch from "./pages/VideoWatch";
import AnalysisResult from "./pages/AnalysisResult";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypager" element={<MypageR />} />
        <Route path="/mypages" element={<MypageS />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/question" element={<Question />} />
        <Route path="/reviewr" element={<ReviewR />} />
        <Route path="/reviews" element={<ReviewS />} />
        <Route path="/totalReview/:analysisId" element={<TotalReview />} />

      </Routes>
    </Router>
  );
}

export default App;
