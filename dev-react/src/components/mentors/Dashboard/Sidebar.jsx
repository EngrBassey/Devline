import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";
import MentorAuth from "../API";

const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
  const name = localStorage.getItem("name");
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await MentorAuth.logout();
      if (response.success) {
        // Remove user data from localStorage upon successful logout
        localStorage.removeItem("name");
        localStorage.removeItem("id");
        setLogoutSuccess(true); // Set logout success message to true
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        console.error("Error logging out mentor:", response.message);
      }
    } catch (error) {
      console.error("Error logging out mentor:", error);
    }
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-toggle" : ""}>
      <div className="sidebar-title">
        <div className="sitebar-brand">
          <FaUserCircle size={80} />
          <h3>{name}</h3>
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>
      {/* Logout success message */}
      {logoutSuccess && (
        <div className="logout-success-message">Logout successful</div>
      )}
      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <a href="/mentor/dashboard">Home</a>
        </li>
        <li className="sidebar-list-item">
          <a href="/mentor/profile">Profile</a>
        </li>
        <li className="sidebar-list-item">
          <a href="/pending-requests">Pending Requests</a>
        </li>
        <li className="sidebar-list-item">
          <a href="/active-requests">Requests in Progress</a>
        </li>
        <li className="sidebar-list-item">
          <a href="/completed-requests">Completed Requests</a>
        </li>

        <button className="btn logout" onClick={handleLogout}>
          Logout
        </button>
      </ul>
    </aside>
  );
};

export default Sidebar;
