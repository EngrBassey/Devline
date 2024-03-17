import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import "./sign.css";
import FullSphere from "../../../assets/sphere (1).png";
import HalfSphere from "../../../assets/sphere.png";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const response = await API.login(username, password);
    if (response.success) {
      localStorage.setItem("id", response.id);
      localStorage.setItem("api_key", response.api_key);
      setUserId(response.id);
      setApiKey(response.api_key);
      setLoggedIn(true);
      navigate("/dashboard");
      console.log("Login successful");
    } else {
      // Login failed
      setError(response.message);
      setMessage(""); // Reset message state
    }
  };
  return (
    <div className="signin-box">
      <div className="sphere-box">
        <img src={HalfSphere} className="sphere-1" alt="" />
        <img src={FullSphere} className="sphere-2" alt="fullsphere" />
      </div>
      <div className="signin-section">
        <h2>Sign In as a Student</h2>
        <form onSubmit={handleSignIn}>
          <div className="socials-box"></div>
          <div className="socials-box">
            {/* <p>or</p> */}
            {error && <p className="error-message">{error}</p>}
            <input
              type="text"
              className="box-input"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="box-input box-3"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn-signin btn-social box-4"> Sign In</button>
            <div>
              <div className="account-box">
                <p className="acct-txt">Don't have an account?</p>
                <a href="/register">Create an account</a>
              </div>
              <div className="f-pass">
                <a href="">Forgot password?</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
