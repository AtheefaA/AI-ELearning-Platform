import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { FaBookOpen, FaTrophy, FaUserGraduate, FaRobot } from "react-icons/fa";

const Dashboard = () => {
  const userId = 1;
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://ai-elearning-platform-ojwp.onrender.com/api/dashboard/${userId}`)
      .then((res) => res.json())
      .then((data) => { setCourses(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const overallProgress = courses.length
    ? Math.round(courses.reduce((s, c) => s + (c.progress || 0), 0) / courses.length)
    : 0;

  if (loading) return (
    <div className="dash-loading">
      <div className="dash-spinner"></div>
      <p>Loading your dashboard...</p>
    </div>
  );

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard">
        {/* Header */}
        <header className="dashboard-header">
          <h2>Welcome Back, Learner 🚀</h2>
          <p>Your personalized AI-driven learning space</p>
        </header>

        {/* Stats */}
        <section className="stats-grid">
          <div className="stat-card">
            <FaBookOpen className="stat-icon" />
            <h3>{courses.length}</h3>
            <p>Courses Enrolled</p>
          </div>
          <div className="stat-card">
            <FaTrophy className="stat-icon" />
            <h3>8</h3>
            <p>Quizzes Completed</p>
          </div>
          <div className="stat-card">
            <FaUserGraduate className="stat-icon" />
            <h3>{overallProgress}%</h3>
            <p>Overall Progress</p>
          </div>
          <div className="stat-card">
            <FaRobot className="stat-icon" />
            <h3>5</h3>
            <p>AI Recommendations</p>
          </div>
        </section>

        {/* Progress + AI */}
        <section className="main-grid">
          <div className="progress-card">
            <h3>Overall Learning Progress</h3>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${overallProgress}%` }}>
                <span>{overallProgress}%</span>
              </div>
            </div>
            <p className="progress-msg">
              {overallProgress === 0
                ? "Enroll in a course to start your journey! 🎯"
                : overallProgress >= 70
                ? "Keep it up! You're doing great 💡"
                : "Stay consistent! You're making progress 🚀"}
            </p>
          </div>

          <div className="ai-card">
            <h3>🤖 AI Recommendations</h3>
            <ul>
              <li>📘 Revise recent courses before quizzes</li>
              <li>🎯 Focus on courses with low progress</li>
              <li>🔥 Explore more AI courses to level up</li>
            </ul>
          </div>
        </section>

        {/* Enrolled Courses */}
        <section className="courses-section">
          <h3>📚 My Enrolled Courses</h3>

          {courses.length === 0 ? (
            <div className="empty-courses">
              <div className="empty-icon">🎓</div>
              <h4>No courses yet!</h4>
              <p>Go to <strong>Courses</strong> and enroll to get started.</p>
            </div>
          ) : (
            <div className="courses-grid">
              {courses.map((course) => (
                <div className="course-card" key={course.id}>
                  <div className="course-card-top">
                    <h4>{course.course_title}</h4>
                    <span className="course-badge">Enrolled</span>
                  </div>
                  <div className="course-meta">
                    <span>📅 {new Date(course.enrolled_at).toLocaleDateString("en-IN")}</span>
                    <span>💰 ₹{course.amount}</span>
                  </div>
                  <div className="course-progress-wrap">
                    <div className="course-progress-bar">
                      <div
                        className="course-progress-fill"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <span className="course-progress-label">{course.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Quizzes */}
        <section className="quiz-section">
          <h3>📝 Upcoming Quizzes</h3>
          <div className="quiz-list">
            {[
              { title: "Python Fundamentals", due: "5 Nov, 2026" },
              { title: "Database Systems",    due: "10 Nov, 2026" },
              { title: "AI & Ethics",         due: "15 Nov, 2026" },
            ].map((q, i) => (
              <div className="quiz-card" key={i}>
                <h4>{q.title}</h4>
                <p>Due: {q.due}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;