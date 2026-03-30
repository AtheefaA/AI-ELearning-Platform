import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HelpCenter.css";

const HelpCenter = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const navigate = useNavigate(); // ✅ React Router navigation hook

  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        "Go to the Login page and click on 'Forgot Password'. You’ll receive an email with a link to reset your password securely.",
    },
    {
      question: "How can I access my purchased courses?",
      answer:
        "All your purchased courses appear under the 'My Courses' section in your Dashboard. You can continue learning anytime.",
    },
    {
      question: "Can I download my course certificates?",
      answer:
        "Yes! Once you complete a course, go to the 'Accomplishments' page and click on 'View Certificate' to download or share it.",
    },
    {
      question: "How do I contact support?",
      answer:
        "If you need additional help, click the 'Contact Support' button below or email us at support@ailearnx.com.",
    },
  ];

  return (
    <div className="helpcenter-fullpage-center">
      <div className="helpcenter-container">
        <h2>Help Center 💬</h2>
        <p className="helpcenter-subtitle">
          Find answers to common questions or contact support for further help.
        </p>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-card ${
                activeQuestion === index ? "active" : ""
              }`}
              onClick={() =>
                setActiveQuestion(activeQuestion === index ? null : index)
              }
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                <span>{activeQuestion === index ? "−" : "+"}</span>
              </div>
              {activeQuestion === index && (
                <p className="faq-answer">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>

        <div className="support-section">
          <h4>Need More Help?</h4>
          <p>
            Can’t find the answer you’re looking for? Our support team is here
            to assist you.
          </p>

          {/* ✅ Button navigates to Contact page */}
          <button
            className="contact-btn"
            onClick={() => navigate("/contact")}
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
