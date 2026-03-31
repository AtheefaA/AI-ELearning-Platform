import React, { useState } from "react";
import "./LoginSignup.css";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [success, setSuccess]       = useState("");

  // ── Clear messages when switching tabs ──
  const switchToLogin    = () => { setIsRegister(false); setError(""); setSuccess(""); };
  const switchToRegister = () => { setIsRegister(true);  setError(""); setSuccess(""); };

  /* ──────────── LOGIN ──────────── */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); setSuccess(""); setLoading(true);

    const email    = e.target.email.value.trim();
    const password = e.target.password.value;

    try {
      const res = await fetch("https://ai-elearning-platform-ojwp.onrender.com/api/login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        // Save token + user info to localStorage
        localStorage.setItem("token",     data.token);
        localStorage.setItem("userId",    data.user.id);
        localStorage.setItem("userName",  data.user.name);
        localStorage.setItem("userEmail", data.user.email);
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => { window.location.href = "/"; }, 1200);
      } else {
        setError(data.error || "Login failed. Try again.");
      }
    } catch (err) {
      setError("Cannot connect to server. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  /* ──────────── REGISTER ──────────── */
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); setSuccess(""); setLoading(true);

    const name     = e.target.name.value.trim();
    const email    = e.target.email.value.trim();
    const password = e.target.password.value;
    const confirm  = e.target.confirm.value;

    if (password !== confirm) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://ai-elearning-platform-ojwp.onrender.com/api/register", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (data.success) {
        setSuccess("Account created! Please login.");
        setTimeout(() => switchToLogin(), 1500);
      } else {
        setError(data.error || "Registration failed. Try again.");
      }
    } catch (err) {
      setError("Cannot connect to server. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-fullpage-center">

      {/* Global message bar */}
      {error   && <div className="auth-msg auth-msg--error">⚠ {error}</div>}
      {success && <div className="auth-msg auth-msg--success">✓ {success}</div>}

      <div className={`container ${isRegister ? "right-panel-active" : ""}`}>

        {/* ══════════ LOGIN ══════════ */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin}>
            <div className="form-logo">🎓</div>
            <h2>Welcome Back</h2>
            <p className="form-sub">Login to continue learning</p>

            <div className="input-group">
              <span className="input-icon">✉</span>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                disabled={loading}
              />
            </div>

            <a href="#" className="forgot-link">Forgot your password?</a>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? <span className="btn-spinner"></span> : "Login"}
            </button>

            <p className="switch-text">
              Don't have an account?{" "}
              <span onClick={switchToRegister}>Register</span>
            </p>
          </form>
        </div>

        {/* ══════════ REGISTER ══════════ */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleRegister}>
            <div className="form-logo">🎓</div>
            <h2>Create Account</h2>
            <p className="form-sub">Join AI LearnX today</p>

            <div className="input-group">
              <span className="input-icon">👤</span>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <span className="input-icon">✉</span>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                name="password"
                placeholder="Password (min 6 chars)"
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                name="confirm"
                placeholder="Confirm Password"
                required
                disabled={loading}
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? <span className="btn-spinner"></span> : "Create Account"}
            </button>

            <p className="switch-text">
              Already have an account?{" "}
              <span onClick={switchToLogin}>Login</span>
            </p>
          </form>
        </div>

        {/* ══════════ OVERLAY ══════════ */}
        <div className="overlay-container">
          <div className="overlay">

            {/* LEFT PANEL */}
            <div className="overlay-panel overlay-left">
              <div className="overlay-logo">🎓</div>
              <h2>Welcome Back!</h2>
              <p>Login to continue your learning journey with AI LearnX</p>
              <button className="ghost" onClick={switchToLogin}>
                Login
              </button>
            </div>

            {/* RIGHT PANEL */}
            <div className="overlay-panel overlay-right">
              <div className="overlay-logo">🎓</div>
              <h2>Hello, Friend!</h2>
              <p>Enter your details and start learning with AI LearnX</p>
              <button className="ghost" onClick={switchToRegister}>
                Register
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;