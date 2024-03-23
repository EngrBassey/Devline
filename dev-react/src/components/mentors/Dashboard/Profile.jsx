import React, { useState, useEffect } from "react";
import MentorAuth from "../API";
import "../mentor.css";
import Sidebar from "./Sidebar";
import Nav from "./Nav";

const MentorProfile = () => {
  const [profileData, setProfileData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await MentorAuth.getProfile();
        if (response.success) {
          setProfileData(response.result);
        } else {
          setError(response.message);
        }
      } catch (error) {
        console.error("Error fetching mentor profile:", error);
        setError("An error occurred while fetching mentor profile");
      }
    };
    fetchProfileData();
  }, []);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <div className="grid-container">
      <Nav OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="profile-container">
        <h2>Your Profile</h2>
        {error && <p className="error-message">{error}</p>}
        {profileData && (
          <div className="profile-info">
            <p>
              <strong>Name:</strong> {profileData.fullname}
            </p>
            <p>
              <strong>Email:</strong> {profileData.email}
            </p>
            <p>
              <strong>Subjects:</strong> {profileData.subjects.join(", ")}
            </p>
            <p>
              <strong>Years of Experience:</strong>{" "}
              {profileData.years_of_experience}
            </p>
            <p>
              <strong>Time Available:</strong> {profileData.time_available}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorProfile;
