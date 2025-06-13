import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import ExtractContent from "./Pages/ExtractContent";
import FlashCards from "./Pages/FlashCards";
import Downloads from "./Pages/Downloads";
import AIStudyCoach from "./Pages/AIStudyCoach";
import ResumeProjects from "./Pages/ResumeProjects";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Footer from "./Components/Footer";
import Summarizer from "./Pages/Summarizer";

function App() {
  return (
    <>
      <Navbar />
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/extract-content" element={<ExtractContent />} />
          <Route path="/flashcards" element={<FlashCards />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/ai-study-coach" element={<AIStudyCoach />} />
          <Route path="/resume-projects" element={<ResumeProjects />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/summarizer" element={<Summarizer />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
