import React from "react";
import "./footer.css";
import { FaSquareFacebook, FaSquareInstagram } from "react-icons/fa6";
import { BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="footer-section">
      <h1>DevLine.com</h1>
      <div className="footer-lists">
        <p>
          <a href="/">Home</a>
        </p>
        <p>
          <a href="/mentors">Mentors</a>
        </p>
        <p>
          <a href="/how">How it Works</a>
        </p>
        <p>
          <a href="/mentor-join">Become a Mentor</a>
        </p>
      </div>
      <div className="icons-section">
        <FaSquareFacebook size={25} className="social-links" />
        <FaSquareInstagram size={25} className="social-links" />
        <BsLinkedin size={25} className="social-links" />
      </div>
      <div className="copy-box">
        <p>&copy; 2024 Copyright devline.com</p>
      </div>
    </div>
  );
};

export default Footer;
