import React from "react";
import "./Workshop.css";

const Workshop = () => {
  const workshops = [
    {
      id: 1,
      title: "🧠 Neural Networks Basics",
      time: "2 days ago",
      description:
        "Learn how neural networks function with hands-on demos. Understand perceptrons, activation functions, and forward propagation in this beginner-friendly workshop.",
      buttonText: "Start Workshop",
    },
    {
      id: 2,
      title: "🤖 CNN Image Classification",
      time: "1 week ago",
      description:
        "Dive into Convolutional Neural Networks (CNNs) and explore how machines recognize images. This session includes real-world case studies and live coding.",
      buttonText: "Join Session",
    },
    {
      id: 3,
      title: "🔍 NLP & Chatbots",
      time: "2 weeks ago",
      description:
        "Discover the magic behind ChatGPT-like systems! Learn tokenization, embeddings, and how models understand text in this Natural Language Processing workshop.",
      buttonText: "View Details",
    },
  ];

  const handleButtonClick = (title) => {
    alert(`You selected: ${title}`);
  };

  return (
    <div className="workshop-fullpage-center">
      <div className="workshop-container">
        <h2>Workshops</h2>
        <p className="workshop-subtitle">
          Learn by doing — participate in our hands-on AI workshops
        </p>

        <div className="workshop-list">
          {workshops.map((workshop) => (
            <div key={workshop.id} className="workshop-card">
              <div className="workshop-header">
                <div className="workshop-logo">W</div>
                <p className="workshop-time">{workshop.time}</p>
              </div>
              <h3>{workshop.title}</h3>
              <p className="workshop-description">{workshop.description}</p>
              <button
                className="workshop-btn"
                onClick={() => handleButtonClick(workshop.title)}
              >
                {workshop.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workshop;
