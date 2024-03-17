import React, { useState } from "react";
import MentorAuth from "../API";
import { useNavigate } from "react-router-dom";
import FullSphere from "../../../assets/sphere (1).png";
import HalfSphere from "../../../assets/sphere.png";

const SignInMentor = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();

    const response = await MentorAuth.login(username, password);
    if (response.success) {
      // Handle successful login

      console.log("Login successful");
      navigate("/mentor/dashboard");
      // Redirect or perform any necessary action upon successful login
    } else {
      // Handle login error
      setError(response.message);
    }
  };

  return (
    <div className="signin-box">
      <div className="sphere-box">
        <img src={HalfSphere} className="sphere-1" alt="" />
        <img src={FullSphere} className="sphere-2" alt="fullsphere" />
      </div>
      <div className="signin-section">
        <h2>Sign In as a Mentor</h2>
        <form onSubmit={handleSignIn}>
          <div className="socials-box">
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
                <a href="/register-mentor">Create an account</a>
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

export default SignInMentor;
