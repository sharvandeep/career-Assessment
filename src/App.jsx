import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import StudentDashboard from "./pages/StudentDashboard";
import StudentAssessments from "./pages/StudentAssessments";
import Results from "./pages/Results";

import FacultyDashboard from "./pages/FacultyDashboard";
import CreateAssessment from "./pages/CreateAssessment";
import AttemptAssessment from "./pages/AttemptAssessment";
import StudentHistory from "./pages/StudentHistory"; 
import StudentReview from "./pages/StudentReview";
import StudentSkillAnalysis from "./pages/StudentSkillAnalysis";

import FacultyResults from "./pages/FacultyResults";
import AssessmentResults from "./pages/AssessmentResults";
import StudentAnswerReview from "./pages/StudentAnswerReview";

import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";

function App() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      cursor.style.left = currentX + "px";
      cursor.style.top = currentY + "px";

      requestAnimationFrame(animate);
    };

    const addHover = () => {
      cursor.classList.add("cursor-hover");
    };

    const removeHover = () => {
      cursor.classList.remove("cursor-hover");
    };

    document.addEventListener("mousemove", moveCursor);

    const attachButtonEvents = () => {
      const buttons = document.querySelectorAll("button");
      buttons.forEach(btn => {
        btn.addEventListener("mouseenter", addHover);
        btn.addEventListener("mouseleave", removeHover);
      });
    };

    attachButtonEvents();

    const observer = new MutationObserver(() => {
      attachButtonEvents();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    animate();

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Router>
        <Navbar />

        <Routes>

          {/* Redirect root to /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Student Routes */}
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/student/assessments" element={<StudentAssessments />} />
          <Route path="/student/results/:studentId" element={<Results />} />
          <Route path="/student/attempt/:assessmentId" element={<AttemptAssessment />} />
          <Route path="/student/review/:assessmentId/:studentId" element={<StudentReview />} />
          <Route path="/results" element={<Results />} />
          <Route path="/student/skills" element={<StudentSkillAnalysis />} />

          {/* Faculty Routes */}
          <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
          <Route path="/faculty/results" element={<FacultyResults />} />
          <Route path="/faculty/assessment/:assessmentId/results" element={<AssessmentResults />} />
          <Route path="/faculty/assessment/:assessmentId/student/:studentId" element={<StudentAnswerReview />} />
          <Route path="/faculty/create-assessment" element={<CreateAssessment />} />
          <Route path="/student/history" element={<StudentHistory />} />

        </Routes>
      </Router>

      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor">
        <div className="cursor-dot"></div>
        <div className="cursor-box"></div>
      </div>
    </>
  );
}

export default App;