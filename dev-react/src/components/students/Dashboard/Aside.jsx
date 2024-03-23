import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import StudentAuth from "../API";

const Aside = ({ openSidebarToggle, OpenSidebar, onClick }) => {
  const name = localStorage.getItem("student_name");
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await StudentAuth.logout();
      if (response.success) {
        // Remove user data from localStorage upon successful logout
        localStorage.removeItem("student_name");
        localStorage.removeItem("student_id");
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
      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <a href="/dashboard">Home</a>
        </li>
        <li className="sidebar-list-item">
          <a href="/student/profile">Profile</a>
        </li>
        <li className="sidebar-list-item">
          <a href="/all-mentors">All Mentors</a>
        </li>
        <li className="sidebar-list-item">
          <a href="/student/active-sessions">Active Sessions</a>
        </li>
        <li className="sidebar-list-item">
          <a href="/student/completed-sessions">Completed Sessions</a>
        </li>
        <button className="btn logout" onClick={handleLogout}>
          Logout
        </button>
      </ul>
    </aside>
  );
};
export default Aside;
