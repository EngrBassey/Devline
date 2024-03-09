import React from "react";
import "./sign.css";
// import { FaGoogle, FaFacebook } from "react-icons/fa6";
import FullSphere from "../../asserts/sphere (1).png";
import HalfSphere from "../../asserts/sphere.png";
import { Link } from "react-router-dom";

const User = () => {
  return (
    <div className="signin-box">
      <div className="sphere-box">
        <img src={HalfSphere} className="sphere-1" alt="" />
        <img src={FullSphere} className="sphere-2" alt="fullsphere" />
      </div>
      <div className="signin-section">
        <h2>Sign in as...</h2>
        <div className="socials-box">
          <button className="btn-signin btn-social box-4">
            <Link to="/signin">Student</Link>
          </button>
          <button className="btn-signin btn-social box-4">
            <Link to="/mentor-signin"> Mentor</Link>
          </button>
          <div>
            <div className="account-box">
              <p className="acct-txt">You don't account?</p>
              <a href="">Sign up</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
