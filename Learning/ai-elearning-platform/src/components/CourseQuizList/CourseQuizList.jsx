import React from "react";
import { useNavigate } from "react-router-dom";
import "./CourseQuizList.css";

const courses = [
  { id: "html", title: "HTML Quiz", img: "https://cdn-icons-png.flaticon.com/512/732/732212.png" },
  { id: "css", title: "CSS Quiz", img: "https://cdn-icons-png.flaticon.com/512/732/732190.png" },
  { id: "javascript", title: "JavaScript Quiz", img: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png" },
  { id: "reactjs", title: "ReactJS Quiz", img: "https://cdn-icons-png.flaticon.com/512/919/919851.png" },
  { id: "java", title: "Java Quiz", img: "https://cdn-icons-png.flaticon.com/512/226/226777.png" },
  { id: "python", title: "Python Quiz", img: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png" },
  { id: "sql", title: "SQL Quiz", img: "https://cdn-icons-png.flaticon.com/512/4492/4492311.png" },
  { id: "dsa", title: "Data Structures Quiz", img: "https://cdn-icons-png.flaticon.com/512/3141/3141147.png" },
  { id: "excel", title: "Excel Quiz", img: "https://cdn-icons-png.flaticon.com/512/732/732220.png" }, // ✅ Added Excel Quiz
];

const CourseQuizList = () => {
  const navigate = useNavigate();
  return (
    <div className="quiz-list-wrapper">
      <h1 className="quiz-list-title">Choose a Quiz</h1>
      <div className="quiz-card-container">
        {courses.map((course) => (
          <div key={course.id} className="quiz-card">
            <img src={course.img} alt={course.title} className="quiz-card-img" />
            <h2 className="quiz-card-title">{course.title}</h2>
            <button
              className="quiz-card-btn"
              onClick={() => navigate(`/quiz/${course.id}`)}
            >
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseQuizList;
