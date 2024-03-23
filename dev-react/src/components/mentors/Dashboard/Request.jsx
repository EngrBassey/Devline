import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Nav from "./Nav";
import MentorAuth from "../API";
import "../mentor.css";

const Request = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [requestData, setRequestData] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams(); // Retrieve the request ID from the URL

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const response = await MentorAuth.getRequest(id);
        if (response.success) {
          setRequestData(response.message);
        } else {
          setError(response.message);
        }
      } catch (error) {
        console.error("Error fetching request:", error);
        setError("An error occurred while fetching the request");
      }
    };
    fetchRequestData();
  }, [id]);
  return (
    <div className="grid-container">
      <Nav OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="request-details">
        {error && <p className="error-message">{error}</p>}
        {requestData && (
          <div className="request-info">
            <h2>Request Details</h2>
            <p>Student: {requestData.student}</p>
            <p>Subject: {requestData.subject}</p>
            <p>Message: {requestData.message}</p>
            <p>Held at: {requestData.time}</p>
            <p>Sent on : {requestData.created_at}</p>
            <p>
              Status: <span className="completed">{requestData.status}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Request;
