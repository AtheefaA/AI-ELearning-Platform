import React from "react";
import { useNavigate } from "react-router-dom";
import "./Updates.css";

const Updates = () => {
  const navigate = useNavigate();

  const updates = [
    {
      id: 1,
      icon: "🎓",
      tag: "Certificate",
      tagColor: "green",
      title: "Congratulations! Your Course Certificate is Ready!",
      time: "2 days ago",
      description:
        "You've successfully completed the 'Introduction to AI' course.",
      actionText: "View Your Accomplishments",
      path: "/accomplishments",
    },
    {
      id: 2,
      icon: "📘",
      tag: "New Course",
      tagColor: "blue",
      title: "Welcome to Machine Learning Fundamentals!",
      time: "1 week ago",
      description: "Start your journey today.",
      actionText: "Go to Course",
      path: "/courses",
    },
    {
      id: 3,
      icon: "💡",
      tag: "Workshop",
      tagColor: "purple",
      title: "Deep Learning Workshop Released!",
      time: "2 weeks ago",
      description: "Hands-on neural network learning.",
      actionText: "Explore Workshop",
      path: "/workshop",
    },
    {
      id: 4,
      icon: "🏆",
      tag: "Achievement",
      tagColor: "orange",
      title: "You Earned a New Badge!",
      time: "3 weeks ago",
      description: "Great progress!",
      actionText: "See Your Badges",
      path: "/accomplishments",
    },
    // {
    //   id: 5,
    //   icon: "📝",
    //   tag: "Quiz",
    //   tagColor: "red",
    //   title: "New Quiz Available — Python Fundamentals",
    //   time: "1 month ago",
    //   description: "Test your knowledge.",
    //   actionText: "Take the Quiz",
    //   path: "/quiz", // ✅ FIXED
    // },
    {
      id: 6,
      icon: "🤖",
      tag: "AI Feature",
      tagColor: "teal",
      title: "AI Assistant Now Available 24/7!",
      time: "1 month ago",
      description: "Ask anything anytime.",
      actionText: "Try AI Assistant",
      path: "/ai-assistant", // ✅ FIXED
    },
  ];

  const tagColors = {
    green: { bg: "#dcfce7", color: "#16a34a" },
    blue: { bg: "#dbeafe", color: "#1d4ed8" },
    purple: { bg: "#ede9fe", color: "#7c3aed" },
    orange: { bg: "#ffedd5", color: "#ea580c" },
    red: { bg: "#fee2e2", color: "#dc2626" },
    teal: { bg: "#ccfbf1", color: "#0d9488" },
  };

  return (
    <div className="updates-page">
      <div className="updates-inner">

        <div className="updates-header">
          <h2>Updates 🔔</h2>
          <p className="updates-subtitle">
            Stay up to date with your learning journey
          </p>
        </div>

        <div className="updates-count">
          <span>{updates.length} notifications</span>
        </div>

        <div className="updates-list">
          {updates.map((update, index) => (
            <div
              className="update-card"
              key={update.id}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="update-icon-col">
                <div className="update-icon-circle">{update.icon}</div>
                {index < updates.length - 1 && (
                  <div className="update-connector"></div>
                )}
              </div>

              <div className="update-content">
                <div className="update-top-row">
                  <span
                    className="update-tag"
                    style={{
                      background: tagColors[update.tagColor].bg,
                      color: tagColors[update.tagColor].color,
                    }}
                  >
                    {update.tag}
                  </span>
                  <span className="update-time">🕐 {update.time}</span>
                </div>

                <h3 className="update-title">{update.title}</h3>
                <p className="update-description">{update.description}</p>

                <button
                  className="update-btn"
                  onClick={() => navigate(update.path)}
                >
                  {update.actionText} →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Updates;