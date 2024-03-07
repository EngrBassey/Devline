import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sign.css";
import FullSphere from "../../asserts/sphere (1).png";
import HalfSphere from "../../asserts/sphere.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Make POST request to backend API
      const response = await fetch(
        "http://127.0.0.1:5000/api/mentor/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        navigate("/home");
        console.log("Registration successful");
      } else {
        // Handle registration errors
        setError(data.message);
      }
    } catch (error) {
      console.error("Error registering:", error);
      setError("Error registering. Please try again later.");
    }
  };

  return (
    <div className="signin-box">
      <div className="sphere-box">
        <img src={HalfSphere} className="sphere-1" alt="" />
        <img src={FullSphere} className="sphere-2" alt="fullsphere" />
      </div>
      <div className="signin-section">
        <h2>Sign Up as a User</h2>
        <form onSubmit={handleSubmit}>
          <div className="socials-box">
            {/* <button className="btn-social">
              <div className="btn-child">
                <FaGoogle size={15} />
                <p>Continue with Google</p>
              </div>
            </button> */}
            {/* <button className="btn-social box-2">
              <div className="btn-child">
                <FaFacebook size={15} />
                <p>Continue with Google</p>
              </div>
            </button> */}
          </div>
          <div className="socials-box">
            {/* <p>or</p> */}
            {error && <p className="error-message">{error}</p>}
            <input
              type="text"
              className="box-input"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              className="box-input box-3"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="box-input box-3"
              placeholder="Enter Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="box-input box-3"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="btn-signin btn-social box-4"> Sign up</button>
            <div>
              <div className="account-box">
                <p className="acct-txt">have account already?</p>
                <a href="/signin-mentor">Sign in</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
