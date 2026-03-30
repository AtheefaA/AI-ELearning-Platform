import React from "react";
import "./Footer.css";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaBriefcase,
  FaGraduationCap,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-minimal">
      {/* Left Section */}
      <div className="footer-left">
        <p>© {new Date().getFullYear()} AI LearnX | Built by Atheefa ❤️</p>
      </div>

      {/* Center Section - Social Links */}
      <div className="footer-center">
        {/* Gmail Direct Compose Link */}
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=atheefa1406@gmail.com&su=Job%20Opportunity&body=Hello%20Atheefa%2C%20I’d%20like%20to%20connect%20regarding%20a%20role."
          target="_blank"
          rel="noopener noreferrer"
          title="Email Atheefa"
        >
          <FaEnvelope />
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <FaGithub />
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <FaLinkedin />
        </a>

        {/* Indeed */}
        <a
          href="https://in.indeed.com/"
          target="_blank"
          rel="noopener noreferrer"
          title="Indeed Profile"
        >
          <FaBriefcase />
        </a>

        {/* Internshala */}
        <a
          href="https://internshala.com/"
          target="_blank"
          rel="noopener noreferrer"
          title="Internshala"
        >
          <FaGraduationCap />
        </a>
      </div>

      {/* Right Section */}
      <div className="footer-right">
        <a href="#">Terms of Use</a>
        <a href="#">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;
