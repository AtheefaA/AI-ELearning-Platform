import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Logo from "../../assets/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  const navigate = useNavigate();

  /* ================= LOAD USER ================= */
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    setDropdownOpen(false);
    navigate("/");
  };

  /* ================= AVATAR LETTER ================= */
  const avatarLetter = userEmail
    ? userEmail.charAt(0).toUpperCase()
    : "";

  return (
    <nav className="navbar">
      {/* ===== Left: Logo ===== */}
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo-img" />
        <span className="logo-text">AI LearnX</span>
      </div>

      {/* ===== Center: Links ===== */}
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
        <li><Link to="/courses" onClick={toggleMenu}>Courses</Link></li>
        <li><Link to="/course-quizzes" onClick={toggleMenu}>Quizzes</Link></li>
        <li><Link to="/testimonials" onClick={toggleMenu}>Testimonials</Link></li>
        <li><Link to="/dashboard" onClick={toggleMenu}>Dashboard</Link></li>
        <li><Link to="/aiassistant" onClick={toggleMenu}>AI Assistant</Link></li>
        <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
      </ul>

      {/* ===== Right Side ===== */}
      <div className="nav-right">
        <DarkModeToggle />

        {userEmail ? (
          <div className="profile-dropdown">
            <div className="profile-circle" onClick={toggleDropdown}>
              {avatarLetter}
            </div>

            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-email">{userEmail}</div>

                <Link to="/profile" className="dropdown-item">Profile</Link>
                <Link to="/purchases" className="dropdown-item">My Purchases</Link>
                <Link to="/settings" className="dropdown-item">Settings</Link>
                <Link to="/updates" className="dropdown-item">Updates</Link>
                <Link to="/accomplishments" className="dropdown-item">Accomplishments</Link>
                <Link to="/help" className="dropdown-item">Help Center</Link>

                <div className="dropdown-divider"></div>

                <span className="dropdown-item logout" onClick={handleLogout}>
                  Logout
                </span>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="btn">
            Login / Signup
          </Link>
        )}
      </div>

      {/* ===== Mobile Icon ===== */}
      <div className="menu-icon" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;
