import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../students/Auth/sign.css";
import FullSphere from "../../../assets/sphere (1).png";
import HalfSphere from "../../../assets/sphere.png";
import Choices from 'choices.js';

import MentorAuth from "../API";


const SignUpForm = () => {

  const navigate = useNavigate();
  const [type, setType] = useState('text');

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    surname: "",
    years_of_experience: "",
    time_available: "",
    subjects: [],
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const selectRef = useRef(null);

  useEffect(() => {
    const selectElement = selectRef.current;
    const choices = new Choices(selectElement, {
      placeholder: true,
      placeholderValue: "Select subjects",
      removeItemButton: true,
    });

    selectElement.addEventListener('change', (event) => {
      const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
      setFormData({ ...formData, subjects: selectedOptions });
    });

    return () => {
      choices.destroy();
      selectElement.removeEventListener('change', (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
        setFormData({ ...formData, subjects: selectedOptions });
      });
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Register mentor
      const response = await MentorAuth.register(formData);

      if (response.success) {
        // Registration successful
        setSuccessMessage("Mentor registered successfully");
        navigate("/mentor-signin");
      } else {
        // Registration failed, display error message
        setError(response.message);
      }
    } catch (error) {
      console.error("Error registering mentor:", error);
      setError("An error occurred while registering");
    }
  };

  const subjects = [
    "JavaScript", "Python", "Java", "C++", "Parallel Computing", "Cryptocurrency",
    "HTML", "CSS", "PHP", "Ruby", "Swift", "TypeScript", "Go", "Kotlin", "Rust",
    "SQL", "R", "Shell", "Scala", "Lua", "Algorithm Design", "Data Structures",
    "Web Development", "Mobile App Development", "Game Development",
    "Network Programming", "CyberSecurity", "Machine Learning",
    "Artificial Intelligence", "Data Science", "Database Management",
    "Operating Systems", "Cloud Computing", "Functional Programming",
    "Embedded Systems", "DevOps", "Testing and QA", "UI/UX Design",
    "Blockchain", "IoT Development", "Parallel Computing",
  ];

  return (
    <div className="signin-box">
      <div className="sphere-box">
        <img src={HalfSphere} className="sphere-1" alt="" />
        <img src={FullSphere} className="sphere-2" alt="fullsphere" />
      </div>
      <div className="signin-section">
        <h2>Sign Up as a Mentor</h2>
        <form onSubmit={handleSubmit}>
          <div className="socials-box">
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <input
              type="text"
              name="first_name"
              className="box-input box-3"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="surname"
              className="box-input box-3"
              placeholder="Surname"
              value={formData.surname}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              className="box-input box-3"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="username"
              className="box-input box-3"
              placeholder="Username"
              required
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              className="box-input box-3"
              placeholder="Enter Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmPassword"
              className="box-input box-3"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <input
              type="number"
              name="years_of_experience"
              className="box-input box-3"
              placeholder="Years of Experience"
              value={formData.years_of_experience}
              onChange={handleChange}
            />
            <input
              type={type}
              onFocus={() => setType('time')}
              onBlur={() => setType('text')}
              name="time_available"
              className="box-input box-3"
              placeholder="HH:MM)"
              value={formData.time_available}
              onChange={handleChange}
            />
            <select
              multiple
              className="box-input box-3"
              ref={selectRef}
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            <button type="submit" className="btn-signin btn-social box-4">
              Sign up
            </button>
          </div>
        </form>
        <div className="account-box">
          <p className="acct-txt">Already have an account?</p>
          <a href="/mentor-signin">Sign in</a>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
