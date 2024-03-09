import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../asserts/logo-1.png";
import { Link } from "react-router-dom";
import "./navbar.css";

const Menu = () => (
  <>
    <p>
      <a href="/">Home</a>
    </p>
    <p>
      <a href="#mentors">Mentors</a>
    </p>
    <p>
      <a href="#offer">How it Works</a>
    </p>
    <p>
      <a href="#becomeamentor">Become a Mentor</a>
    </p>
  </>
);
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <img src={logo} />
        </div>
      </div>
      <div className="gpt3__navbar-links_container">
        <Menu />
      </div>
      <div className="gpt3__navbar-sign">
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
