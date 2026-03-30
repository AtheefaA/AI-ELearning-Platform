import React, { useEffect, useState } from "react";
import "./SuccessPage.css";

const SuccessPage = ({ course, onCancel }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
  }, []);

  return (
    <div className="success-overlay">
      <div className={`success-card ${visible ? "success-card--in" : ""}`}>

        {/* Animated Check */}
        <div className="success-icon-wrap">
          <svg viewBox="0 0 52 52" className="checkmark-svg">
            <circle className="checkmark-circle" cx="26" cy="26" r="24" fill="none" />
            <path  className="checkmark-tick"   fill="none" d="M14 27l7 7 17-17" />
          </svg>
        </div>

        <h2 className="success-title">Payment Successful!</h2>
        <p className="success-sub">You're officially enrolled in</p>
        <p className="success-course-name">"{course.title}"</p>

        {/* Receipt */}
        <div className="success-receipt">
          <div className="receipt-row">
            <span>Course</span>
            <span>{course.title}</span>
          </div>
          <div className="receipt-row">
            <span>Duration</span>
            <span>⏳ {course.duration}</span>
          </div>
          <div className="receipt-row">
            <span>Amount Paid</span>
            <span className="receipt-amount">{course.price}</span>
          </div>
          <div className="receipt-row">
            <span>Status</span>
            <span className="receipt-status">✅ Confirmed</span>
          </div>
        </div>

        <p className="success-note">
          🎉 Your course is now available in your Dashboard. Happy learning!
        </p>

        <button className="btn-success-back" onClick={onCancel}>
          ← Back to Courses
        </button>

      </div>
    </div>
  );
};

export default SuccessPage;