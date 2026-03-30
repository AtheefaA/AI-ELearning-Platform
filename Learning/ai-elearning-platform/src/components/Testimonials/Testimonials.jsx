import React from "react";
import { FaStar } from "react-icons/fa";
import "./Testimonials.css";

const testimonialsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Data Science Student",
    feedback:
      "AI LearnX completely changed the way I study! The adaptive quizzes and personalized insights helped me improve faster than ever.",
    img: "https://i.pravatar.cc/100?img=12",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Lee",
    role: "AI Research Enthusiast",
    feedback:
      "The AI mentor feels real! I can get instant feedback and real-time guidance on even the most complex topics.",
    img: "https://i.pravatar.cc/100?img=23",
    rating: 5,
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Software Engineering Student",
    feedback:
      "The platform makes learning so fun! The interactive dashboard and gamified quizzes kept me engaged every day.",
    img: "https://i.pravatar.cc/100?img=32",
    rating: 4,
  },
  {
    id: 4,
    name: "David Kim",
    role: "ML Engineer",
    feedback:
      "The AI-driven recommendations are so accurate! I learned exactly what I needed, without wasting time on unnecessary lessons.",
    img: "https://i.pravatar.cc/100?img=44",
    rating: 5,
  },
  {
    id: 5,
    name: "Emily Carter",
    role: "College Student",
    feedback:
      "AI LearnX gave me the confidence to tackle AI concepts I used to find intimidating. The bite-sized lessons are so effective!",
    img: "https://i.pravatar.cc/100?img=47",
    rating: 5,
  },
  {
    id: 6,
    name: "Ravi Shankar",
    role: "Data Analyst Intern",
    feedback:
      "The real-world projects and clear explanations made me job-ready. It’s like learning from an AI mentor 24/7!",
    img: "https://i.pravatar.cc/100?img=56",
    rating: 5,
  },
  {
    id: 7,
    name: "Jessica Brown",
    role: "Deep Learning Enthusiast",
    feedback:
      "The course flow is beautifully structured. Each module feels like a small win — super satisfying!",
    img: "https://i.pravatar.cc/100?img=58",
    rating: 4,
  },
  {
    id: 8,
    name: "Arjun Mehta",
    role: "AI Startup Founder",
    feedback:
      "A must-have platform for anyone serious about AI. The quizzes and insights helped my team upskill efficiently!",
    img: "https://i.pravatar.cc/100?img=63",
    rating: 5,
  },
  {
    id: 9,
    name: "Lina Chen",
    role: "Machine Learning Researcher",
    feedback:
      "The platform keeps evolving! The latest reinforcement learning section is simply top-notch.",
    img: "https://i.pravatar.cc/100?img=68",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <div className="testimonials-fullpage-center">
      <div className="testimonials-container">
        <h2 className="testimonials-title">What Our Learners Say</h2>
        <p className="testimonials-subtitle">
          Hear from students and professionals who leveled up with{" "}
          <span>AI LearnX</span>
        </p>

        <div className="testimonials-grid">
          {testimonialsData.map((item) => (
            <div className="testimonial-card" key={item.id}>
              <div className="testimonial-header">
                <img
                  src={item.img}
                  alt={item.name}
                  className="testimonial-img"
                />
                <div>
                  <h3>{item.name}</h3>
                  <p className="testimonial-role">{item.role}</p>
                </div>
              </div>

              <p className="testimonial-feedback">“{item.feedback}”</p>

              <div className="testimonial-stars">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <FaStar key={i} className="star-icon" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
