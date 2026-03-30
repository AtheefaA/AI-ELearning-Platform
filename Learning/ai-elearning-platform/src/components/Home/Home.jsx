import React from "react";
import "./Home.css";
import { Link } from "react-router-dom"; // ✅ Import Link

const Home = () => {
  return (
    <section className="home" id="home">
      <div className="home-content">
        <h1>Welcome to AI LearnX</h1>
        <p>
          Empower your learning journey with AI-driven personalized courses,
          interactive quizzes, and real-time assistance.
        </p>
        <div className="home-buttons">
          {/* ✅ Link to Courses page */}
          <Link to="/courses" className="btn-primary">
            Explore Courses
          </Link>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=atheefa1406@gmail.com&su=Collaboration%20Opportunity&body=Hello%20Atheefa%2C%20We%20are%20interested%20in%20your%20AI-Driven%20E-Learning%20Platform."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Get Started
          </a>
        </div>
      </div>
      <div className="home-image">
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=687&q=80"
          alt="Learning AI"
        />
      </div>
    </section>
  );
};

export default Home;
