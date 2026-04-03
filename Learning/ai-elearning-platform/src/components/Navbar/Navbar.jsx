import React, { useEffect, useState, useRef } from "react";
import "./Navbar.css";
import Logo from "../../assets/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen]           = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userEmail, setUserEmail]     = useState(null);

  const navigate  = useNavigate();
  const location  = useLocation();
  const dropdownRef = useRef(null);

  /* ── Load user ── */
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email);
  }, []);

  /* ── Close dropdown on outside click ── */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── Close mobile menu on route change ── */
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location]);

  /* ── Lock body scroll when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const closeMenu     = () => setIsOpen(false);
  const toggleMenu    = () => setIsOpen((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  /* ── Logout ── */
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    setDropdownOpen(false);
    setIsOpen(false);
    navigate("/");
  };

  const avatarLetter = userEmail ? userEmail.charAt(0).toUpperCase() : "";

  const navLinks = [
    { to: "/",              label: "Home"         },
    { to: "/courses",       label: "Courses"      },
    { to: "/course-quizzes",label: "Quizzes"      },
    { to: "/testimonials",  label: "Testimonials" },
    { to: "/dashboard",     label: "Dashboard"    },
    { to: "/aiassistant",   label: "AI Assistant" },
    { to: "/contact",       label: "Contact"      },
  ];

  return (
    <>
      <nav className="navbar">
        {/* ── Logo ── */}
        <div className="logo-container">
          <img src={Logo} alt="Logo" className="logo-img" />
          <span className="logo-text">AI LearnX</span>
        </div>

        {/* ── Desktop Links ── */}
        <ul className="nav-links">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={location.pathname === to ? "active-link" : ""}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Desktop Right ── */}
        <div className="nav-right">
          <DarkModeToggle />

          {userEmail ? (
            <div className="profile-dropdown" ref={dropdownRef}>
              <div className="profile-circle" onClick={toggleDropdown}>
                {avatarLetter}
              </div>

              {dropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-email">{userEmail}</div>
                  <Link to="/profile"        className="dropdown-item">Profile</Link>
                  <Link to="/purchases"      className="dropdown-item">My Purchases</Link>
                  <Link to="/settings"       className="dropdown-item">Settings</Link>
                  <Link to="/updates"        className="dropdown-item">Updates</Link>
                  <Link to="/accomplishments"className="dropdown-item">Accomplishments</Link>
                  <Link to="/help"           className="dropdown-item">Help Center</Link>
                  <div className="dropdown-divider" />
                  <span className="dropdown-item logout" onClick={handleLogout}>
                    Logout
                  </span>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn">Login / Signup</Link>
          )}
        </div>

        {/* ── Hamburger ── */}
        <button
          className="menu-icon"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* ════════════════════════════════
          MOBILE FULL-SCREEN DRAWER
          ════════════════════════════════ */}
      <div className={`mobile-drawer ${isOpen ? "open" : ""}`} aria-hidden={!isOpen}>

        {/* Drawer header */}
        <div className="mobile-drawer-header">
          <div className="logo-container">
            <img src={Logo} alt="Logo" className="logo-img" />
            <span className="logo-text">AI LearnX</span>
          </div>
          <button className="mobile-close-btn" onClick={closeMenu} aria-label="Close menu">
            <FaTimes />
          </button>
        </div>

        {/* Drawer links */}
        <ul className="mobile-nav-links">
          {navLinks.map(({ to, label }, i) => (
            <li key={to} style={{ animationDelay: `${0.05 + i * 0.055}s` }}>
              <Link
                to={to}
                className={location.pathname === to ? "active-link" : ""}
                onClick={closeMenu}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Drawer footer */}
        <div className="mobile-drawer-footer">
          <DarkModeToggle fullWidth />

          {userEmail ? (
            <div className="mobile-user-info">
              <div className="mobile-avatar">{avatarLetter}</div>
              <span className="mobile-user-email">{userEmail}</span>
            </div>
          ) : null}

          {userEmail ? (
            <div className="mobile-user-links">
              <Link to="/profile"         onClick={closeMenu} className="mobile-user-link">Profile</Link>
              <Link to="/purchases"       onClick={closeMenu} className="mobile-user-link">My Purchases</Link>
              <Link to="/settings"        onClick={closeMenu} className="mobile-user-link">Settings</Link>
              <Link to="/accomplishments" onClick={closeMenu} className="mobile-user-link">Accomplishments</Link>
              <Link to="/help"            onClick={closeMenu} className="mobile-user-link">Help Center</Link>
            </div>
          ) : null}

          {userEmail ? (
            <button className="mobile-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn mobile-login-btn" onClick={closeMenu}>
              Login / Signup
            </Link>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div className="mobile-backdrop" onClick={closeMenu} aria-hidden="true" />
      )}
    </>
  );
};

export default Navbar;