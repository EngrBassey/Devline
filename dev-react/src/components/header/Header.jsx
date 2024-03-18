import React from "react";
import "./header.css";
import Headerimage from "../../assets/undraw_youtube_tutorial_re_69qc.svg";
import People from "../../assets/people.png";
const Header = () => {
  return (
    <div className="header">
      <div className="header-section">
        <div className="left-header">
          <div>
            <h1 className="header-txt">Welcome to Devline</h1>
            <p>
              Let's embark on this journey together, where your vision meets
              <br></br> our technical prowess to create something extraordinary.
            </p>
          </div>
          <div className="search-section">
            <input type="text" id="searchInput" name="search" />
            <button className="btn">Search</button>
          </div>
        </div>
        <div className="header-section2">
          <img src={Headerimage} alt="header-img" />
        </div>
      </div>
      <div className="people-section">
        <img src={People} alt="people-img" />
        <p>Over 1,500 people requested to access a visit in last 24hrs</p>
      </div>
    </div>
  );
};

export default Header;
