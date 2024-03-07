import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sign.css";
import { FaGoogle, FaFacebook } from "react-icons/fa6";
import FullSphere from "../../asserts/sphere (1).png";
import HalfSphere from "../../asserts/sphere.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/api/mentor/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // navigate to dashboard
        navigate("/home");
        console.log("Login successful");
      } else {
        setError(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
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

export default SignIn;
