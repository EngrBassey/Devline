import React, { useState, useEffect } from "react";
import StudentAuth from "../API";
import "../../mentors/mentor.css";
import Aside from "./Aside";
import Header from "./Header";
import "../../mentors/Dashboard/listbox.css";
import { Link } from "react-router-dom";

const CompletedSessions = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const id = localStorage.getItem("student_id");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          "http://devline.live/api/student/requests",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${id}`,
            },
          }
        );
        const data = await response.json();
        setRequests(data.requests);
        console.log(data.requests);
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
      <Header OpenSidebar={OpenSidebar} />
      <Aside openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

      <div className="profile-container">
        <div className="tracking">
          <div className="mentor-requests-container">
            {error && <p className="error-message">{error}</p>}
            {requests == undefined ||
            requests === null ||
            requests.length === 0 ? (
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
                          <span className="student-name">{request.mentor}</span>{" "}
                          for{" "}
                          <span className="subject">{request.subject_id}</span>{" "}
                          class at <span className="time">{request.time}</span>{" "}
                          has been completed.
                        </p>
                        <button className="accept-button">
                          <Link
                            to={`/review/mentor/${request.id}`}
                            className="accept-button"
                          >
                            Review Mentor
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
    </div>
  );
};

export default CompletedSessions;
