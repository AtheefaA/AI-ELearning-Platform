import React, { useState, useEffect } from "react";
import "./Profile.css";
import ProfileImg from "../assets/Profile.jpeg";

const Profile = () => {
  const userId   = localStorage.getItem("userId");
  const [user, setUser]       = useState(null);
  const [stats, setStats]     = useState({ courses: 0, totalSpent: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    if (!userId) {
      setError("Not logged in. Please login first.");
      setLoading(false);
      return;
    }

    // Fetch user profile + enrollments in parallel
    Promise.all([
      fetch(`https://ai-elearning-platform-ojwp.onrender.com/api/user/${userId}`).then(r => r.json()),
      fetch(`https://ai-elearning-platform-ojwp.onrender.com/api/dashboard/${userId}`).then(r => r.json()),
    ])
      .then(([userData, enrollments]) => {
        setUser(userData);
        setStats({
          courses:    enrollments.length,
          totalSpent: enrollments.reduce((s, e) => s + (e.amount || 0), 0),
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load profile. Make sure backend is running.");
        setLoading(false);
      });
  }, [userId]);

  // ── Loading ──
  if (loading) return (
    <div className="page-full-center">
      <div className="purchases-loading">
        <div className="purchases-spinner"></div>
        <p>Loading your profile...</p>
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

  // ── Format joined date ──
  const joinedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-IN", {
        day:   "numeric",
        month: "long",
        year:  "numeric",
      })
    : "—";

  // ── Get initials for avatar fallback ──
  const initials = user?.name
    ? user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <div className="page-full-center">
      <div className="profile-wrapper">

        {/* ── Top Banner ── */}
        <div className="profile-banner">
          <div className="profile-banner-bg"></div>
          <div className="profile-avatar-wrap">
            <img
              src={ProfileImg}
              alt="Profile"
              className="profile-avatar"
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <div className="profile-avatar-fallback">{initials}</div>
          </div>
        </div>

        {/* ── Name + Email ── */}
        <div className="profile-identity">
          <h2>{user?.name || "—"}</h2>
          <p className="profile-email">✉ {user?.email || "—"}</p>
          <span className="profile-role-badge">🎓 Student</span>
        </div>

        {/* ── Stats Row ── */}
        <div className="profile-stats">
          <div className="profile-stat">
            <h4>{stats.courses}</h4>
            <p>Courses Enrolled</p>
          </div>
          <div className="profile-stat-divider"></div>
          <div className="profile-stat">
            <h4>₹{stats.totalSpent.toLocaleString("en-IN")}</h4>
            <p>Total Spent</p>
          </div>
          <div className="profile-stat-divider"></div>
          <div className="profile-stat">
            <h4>{joinedDate}</h4>
            <p>Member Since</p>
          </div>
        </div>

        {/* ── Info Cards ── */}
        <div className="profile-info-grid">

          <div className="profile-info-card">
            <div className="info-card-icon">👤</div>
            <div className="info-card-content">
              <label>Full Name</label>
              <p>{user?.name || "—"}</p>
            </div>
          </div>

          <div className="profile-info-card">
            <div className="info-card-icon">✉</div>
            <div className="info-card-content">
              <label>Email Address</label>
              <p>{user?.email || "—"}</p>
            </div>
          </div>

          <div className="profile-info-card">
            <div className="info-card-icon">📅</div>
            <div className="info-card-content">
              <label>Member Since</label>
              <p>{joinedDate}</p>
            </div>
          </div>

          <div className="profile-info-card">
            <div className="info-card-icon">🎓</div>
            <div className="info-card-content">
              <label>Courses Enrolled</label>
              <p>{stats.courses} course{stats.courses !== 1 ? "s" : ""}</p>
            </div>
          </div>

          <div className="profile-info-card">
            <div className="info-card-icon">💰</div>
            <div className="info-card-content">
              <label>Total Spent</label>
              <p>₹{stats.totalSpent.toLocaleString("en-IN")}</p>
            </div>
          </div>

          <div className="profile-info-card">
            <div className="info-card-icon">🆔</div>
            <div className="info-card-content">
              <label>User ID</label>
              <p>#{userId}</p>
            </div>
          </div>

        </div>

        {/* ── Logout Button ── */}
        <button
          className="profile-logout-btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          🚪 Logout
        </button>

      </div>
    </div>
  );
};

export default Profile;