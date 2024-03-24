import React from "react";
import "./howitworks.css";
import Mentorln from "../../assets/men.png";
import StudentLn from "../../assets/stu.png";

const Howitworks = () => {
  return (
    <div className="how-it-works">
      <div className="how-section">
        <div className="first-txt">
          <h1>How it Works</h1>
          <p>
            Welcome to DevLine, where experienced developers mentor and guide
            aspiring programmers on their journey to mastering programming
            languages and technologies. Our mentorship program follows a
            structured approach to ensure effective learning and support for
            every mentee
          </p>
        </div>
      </div>
      <h2>How we match mentors to meentes</h2>
      <div className="application-box">
        <div className="apps-section">
          <p>
            Prospective mentees can apply to join our program by filling out an
            application form on our website. We gather information about their
            current skill level, learning goals, and preferences to match them
            with the most suitable mentor.
            <br />
            <br /> Mentors work closely with their mentees to define clear and
            achievable learning objectives. Whether it's mastering a specific
            programming language, building a portfolio project, or preparing for
            a career transition, mentors tailor their guidance to meet the
            mentee's individual needs.
          </p>
        </div>
        <div className="apps-img">
          <img src={Mentorln} alt="mentors-png" />
        </div>
      </div>
      <h2>Initial Meeting</h2>
      <div className="application-box">
        <div className="apps-section">
          <p>
            {" "}
            Once a mentor-mentee pair is established, they schedule an initial
            meeting to get acquainted and discuss their goals for the mentorship
            program. This meeting sets the foundation for a productive and
            collaborative learning journey.
            <br />
            <br />
            Our team carefully reviews each application and matches mentees with
            mentors based on compatibility, expertise, and availability. We
            strive to create mentor-mentee pairs that complement each other's
            strengths and interests.
          </p>
        </div>
        <div className="apps-img">
          <img src={StudentLn} alt="mentors-png" />
        </div>
      </div>
      <div>
        <h1>Ready to get started?</h1>
        <p>Get help from top Mentor</p>
        <a href="/users"><button className="btn">Get Started</button></a>
      </div>
    </div>
  );
};

export default Howitworks;
