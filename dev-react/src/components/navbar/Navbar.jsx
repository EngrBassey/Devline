import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/logo-1.png";
import { Link, useNavigate } from "react-router-dom";
import About from "../about/About";
import Howitworks from "../howitworks/howitworks";
import "./navbar.css";

const Menu = () => (
  <>
    <p>
      <a href="/">Home</a>
    </p>
    <p>
      <a href="/about">About us</a>
    </p>
    <p>
      <a href="/how">How it Works</a>
    </p>
    <p>
      <Link to="/mentor-join">Become a Mentor</Link>
    </p>
  </>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
        <a href="/">
          <img src={logo} alt="Logo" />
          </a>
        </div>
      </div>
      <div className="gpt3__navbar-links_container">
        <Menu />
      </div>
      {/* <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search for mentor by subject"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button type="submit">search</button>
      </form> */}
      <div className="gpt3__navbar-sign">
        <p>
          <Link to="/mentors">Available Mentors</Link>
        </p>
        <p>
          <Link to="/users">Sign in</Link>
        </p>
        <button type="button">
          <Link to="/register">Sign up</Link>
        </button>
      </div>
      <div className="gpt3__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="gpt3__navbar-menu_container scale-up-center">
            <div className="gpt3__navbar-menu_container-links">
              <Menu />

            </div>
            <div className="gpt3__navbar-menu_container-links-sign">
              <p>
                <a href="/users">Sign in</a>
              </p>
              <button type="button">
                <Link to="/register">Sign up</Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
