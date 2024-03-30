import React, { useState, useEffect } from "react";
import "./listbox.css";
import MentorAuth from "../API";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Nav from "./Nav";

const CompletedRequests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const id = localStorage.getItem("mentor_id");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          "http://devline.live/api/mentor/requests",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${id}`,
            },
          }
        );
        const data = await response.json();
        setRequests(data.requests);
      } catch (error) {
        console.error("Error fetching mentorship requests:", error);
        setError("An error occurred while fetching mentorship requests");
      }
    };
    fetchRequests();
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
    <div className="tracking">
    <div className="mentor-requests-container">
      {error && <p className="error-message">{error}</p>}
      {requests == undefined || requests === null ? (
        <p className="no-requests-message">
          You have no completed requests yet
        </p>
      ) : (
        <>
          {error && <p className="error-message">{error}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          <div className="request-status">
            <h2>Completed Requests</h2>
            {requests
              .filter((request) => request.status === "completed")
              .map((request, index) => (
                <div key={index} className="request-item">
                  <p>
                    Your session with{" "}
                    <span className="student-name">{request.student}</span> for{" "}
                    <span className="subject">{request.subject_id}</span> class
                    at <span className="time">{request.time}</span> has been
                    completed. Thank you!
                  </p>
                  <button className="accept-button">
                    <Link to={`/review/mentor/${request.id}`}>
                      View Details
                    </Link>
                  </button>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
    </div>
    </div>
  );
};

export default CompletedRequests;
