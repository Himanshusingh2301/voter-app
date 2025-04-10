import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterVoter from "./components/voter/RegisterVoter";
import VoterLogin from "./components/voter/VoterLogin";
import Navbar from "./components/nav/navbar";
import HomePage from "./components/pages/Homepage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterVoter />} />
        <Route path="/login" element={<VoterLogin />} />
      </Routes>
    </>
  );
}

export default App;
