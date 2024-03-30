import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import "./sign.css";
import FullSphere from "../../../assets/sphere (1).png";
import HalfSphere from "../../../assets/sphere.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const response = await API.register(username, email, password);
    if (response.success) {
      setMessage("Registration successful");
      navigate("/signin");
    } else {
      setMessage(response.message);
    }
  };

  return (
    <div className="signin-box">
      <div className="sphere-box">
        <img src={HalfSphere} className="sphere-1" alt="" style={{ width: "200px" }}/>
        <img src={FullSphere} className="sphere-2" alt="fullsphere" />
      </div>
      <div className="signin-section">
        <h2>Sign Up as a Student</h2>
        <form onSubmit={handleRegister}>
          <div className="socials-box"></div>
          <div className="socials-box">
            {message && <p>{message}</p>}
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
                <a href="/signin">Sign in</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
