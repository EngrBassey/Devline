import React, { useState, useEffect } from "react";
import StudentAuth from "../API";
import "../../mentors/mentor.css";
import Aside from "./Aside";
import Header from "./Header";

const StudentProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await StudentAuth.getProfile();
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

  console.log(profileData);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Aside
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        onClick={() => setOpenModal(true)}
      />

      <div className="profile-container">
        <h2>Your Profile</h2>
        {error && <p className="error-message">{error}</p>}
        {profileData && (
          <div className="profile-info">
            <p>
              <strong>UserName:</strong> {profileData.username}
            </p>
            <p>
              <strong>Email:</strong> {profileData.email}
            </p>
            <p>
              <strong>Subjects:</strong> {profileData.subjects.join(", ")}
            </p>

            {/* Add more profile details */}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
