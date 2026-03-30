import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Courses from "./components/Courses/Courses";
import EnrollPage from "./components/EnrollPage/EnrollPage";
import PaymentPage from "./components/PaymentPage/PaymentPage";
import Quiz from "./components/Quiz/Quiz";
import Dashboard from "./components/Dashboard/Dashboard";
import AIAssistant from "./components/AIAssistant/AIAssistant";
import Contact from "./components/Contact/Contact";
import Testimonials from "./components/Testimonials/Testimonials";
import CourseQuizList from "./components/CourseQuizList/CourseQuizList";
import LoginSignup from "./components/LoginSignup/LoginSignup";

// New Pages
import Profile from "./pages/Profile";
import Purchases from "./pages/Purchases";
import Settings from "./pages/Settings";
import Updates from "./pages/Updates";
import Accomplishments from "./pages/Accomplishments";
import HelpCenter from "./pages/HelpCenter";
import Workshop from "./pages/Workshop";

const App = () => {
  const [enrollingCourse, setEnrollingCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // 🟣 When user clicks "Enroll Now"
  const handleEnrollClick = (course) => {
    if (!isLoggedIn) {
      navigate("/login"); // redirect to login instead of alert
      return;
    }
    setEnrollingCourse(course);
    setEnrolled(false);
  };

  // ✅ Confirm enrollment
  const handleConfirmEnroll = () => {
    setEnrolled(true);
  };

  // 🔙 Cancel enrollment
  const handleCancel = () => {
    setEnrollingCourse(null);
    setEnrolled(false);
  };

  // 🔐 Handle login/logout state
  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/"); // redirect to home after login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      {/* Navbar */}
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      {/* App Routes */}
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route
          path="/courses"
          element={<Courses onEnrollClick={handleEnrollClick} />}
        />
        <Route
          path="/enroll"
          element={
            enrollingCourse ? (
              <EnrollPage
                course={enrollingCourse}
                onEnroll={handleConfirmEnroll}
                onCancel={handleCancel}
                enrolled={enrolled}
              />
            ) : (
              <h2 style={{ textAlign: "center", marginTop: "50px" }}>
                ⚠️ No course selected. Go back to{" "}
                <a href="/courses" style={{ color: "#7c3aed" }}>
                  Courses
                </a>
                .
              </h2>
            )
          }
        />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/course-quizzes" element={<CourseQuizList />} />
        <Route path="/quiz/:courseId" element={<Quiz />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/aiassistant" element={<AIAssistant />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginSignup onLogin={handleLogin} />} />

        {/* User Pages */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/accomplishments" element={<Accomplishments />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/workshop" element={<Workshop />} />
        
      </Routes>
    </>
  );
};

export default App;
