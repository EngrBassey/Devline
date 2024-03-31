import React from "react";
import "./feature.css";
import { FaChalkboard, FaChalkboardUser, FaCode } from "react-icons/fa6";

const Feature = () => {
  return (
    <div className="features-offer">
      <h2 id="offer">What we Offer</h2>
      <div className="features-section1">
        <div className="offer offer-box1">
          <FaChalkboard size={40} className="icons" />
          <h3>Programming Courses</h3>
          <p>
            Sharpen your coding skills and reinforce your knowledge through our
            interactive coding challenges. Designed to simulate real-world
            scenarios, our challenges offer practical exercises across various
            programming languages and problem-solving techniques.
          </p>
          <a href="/users">
            <button className="btn">Get Started</button>{" "}
          </a>
        </div>
        <div className="offer offer-box2">
          <FaCode size={40} className="icons" />
          <h3>Coding Challenges</h3>
          <p>
            Sharpen your coding skills and reinforce your knowledge through our
            interactive coding challenges. Designed to simulate real-world
            scenarios, our challenges offer practical exercises across various
            programming languages and problem-solving techniques.
          </p>
          <a href="/users">
            <button className="btn">Get Started</button>{" "}
          </a>
        </div>
        <div className="offer offer-box3">
          <FaChalkboardUser size={40} className="icons" />
          <h3> Mentorship Programs</h3>
          <p>
            Accelerate your learning journey with our personalized mentorship
            programs tailored to your individual needs and goals. Our
            experienced mentors provide one-on-one guidance, constructive
            feedback, and customized learning plans to help you overcome
            challenges.
          </p>
          <a href="/users">
            <button className="btn">Get Started</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Feature;
