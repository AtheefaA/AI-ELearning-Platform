import React, { useState, useEffect } from "react";
import "./Purchases.css";

const Purchases = () => {
  const userId   = localStorage.getItem("userId") || 1;
  const userName = localStorage.getItem("userName") || "Learner";

  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/dashboard/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setPurchases(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load purchases. Make sure backend is running.");
        setLoading(false);
      });
  }, [userId]);

  const totalSpent = purchases.reduce((sum, p) => sum + (p.amount || 0), 0);

  // ── Loading ──
  if (loading) return (
    <div className="page-full-center">
      <div className="purchases-loading">
        <div className="purchases-spinner"></div>
        <p>Loading your purchases...</p>
      </div>
    </div>
  );

  // ── Error ──
  if (error) return (
    <div className="page-full-center">
      <div className="purchases-error">
        <p>⚠ {error}</p>
      </div>
    </div>
  );

  return (
    <div className="page-full-center">
      <div className="page-container">

        {/* Header */}
        <div className="purchases-header">
          <h2>My Purchases 🛒</h2>
          <p className="page-subtitle">
            Hey <strong>{userName}</strong>, here are all your enrolled courses
          </p>
        </div>

        {/* Summary Cards */}
        <div className="purchases-summary">
          <div className="summary-card">
            <span className="summary-icon">🎓</span>
            <div>
              <h4>{purchases.length}</h4>
              <p>Courses Purchased</p>
            </div>
          </div>
          <div className="summary-card">
            <span className="summary-icon">💰</span>
            <div>
              <h4>₹{totalSpent.toLocaleString("en-IN")}</h4>
              <p>Total Spent</p>
            </div>
          </div>
          <div className="summary-card">
            <span className="summary-icon">📅</span>
            <div>
              <h4>
                {purchases.length > 0
                  ? new Date(purchases[0].enrolled_at).toLocaleDateString("en-IN")
                  : "—"}
              </h4>
              <p>Latest Purchase</p>
            </div>
          </div>
        </div>

        {/* Purchases List */}
        {purchases.length === 0 ? (
          <div className="purchases-empty">
            <div className="empty-emoji">🛒</div>
            <h3>No purchases yet!</h3>
            <p>
              Go to <strong>Courses</strong> and enroll to see them here.
            </p>
          </div>
        ) : (
          <div className="page-content">
            {purchases.map((purchase, index) => (
              <div key={purchase.id} className="course-item">

                {/* Left — number + icon */}
                <div className="course-item-left">
                  <span className="course-number">{index + 1}</span>
                  <span className="course-icon">🎓</span>
                </div>

                {/* Middle — title + date */}
                <div className="course-item-middle">
                  <span className="course-title">{purchase.course_title}</span>
                  <span className="course-date">
                    📅 Purchased on{" "}
                    {new Date(purchase.enrolled_at).toLocaleDateString("en-IN", {
                      day:   "numeric",
                      month: "long",
                      year:  "numeric",
                    })}
                  </span>
                </div>

                {/* Right — amount + badge */}
                <div className="course-item-right">
                  <span className="course-amount">₹{purchase.amount}</span>
                  <span className="course-status-badge">✅ Enrolled</span>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Total Footer */}
        {purchases.length > 0 && (
          <div className="purchases-footer">
            <span>Total Amount Paid</span>
            <span className="purchases-total">
              ₹{totalSpent.toLocaleString("en-IN")}
            </span>
          </div>
        )}

      </div>
    </div>
  );
};

export default Purchases;