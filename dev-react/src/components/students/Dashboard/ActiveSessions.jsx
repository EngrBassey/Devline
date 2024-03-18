import React, { useState, useEffect } from "react";
import StudentAuth from "../API";
import "../../mentors/mentor.css";
import Aside from "./Aside";
import Header from "./Header";
import "../../mentors/Dashboard/listbox.css";

const ActiveSessions = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const id = localStorage.getItem("student_id");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/student/requests",
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

  const handleCompleteRequest = async (requestId) => {
    try {
      const response = await StudentAuth.completeRequest(requestId);
      if (response.success) {
        setSuccessMessage("Request marked as completed successfully.");
        setTimeout(() => {
          setSuccessMessage("");
          setRequests((prevRequests) =>
            prevRequests.map((request) =>
              request.id === requestId
                ? { ...request, status: "completed" }
                : request
            )
          );
        }, 2000);
      } else {
        setError("Failed to mark request as completed.");
      }
    } catch (error) {
      console.error("Error completing request:", error);
    }
  };

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
            <h2>Active Requests</h2>
            {requests.every((request) => request.status !== "active") ? (
              <p className="no-requests-message">You have no active requests</p>
            ) : (
              <>
                {successMessage && (
                  <p className="success-message">{successMessage}</p>
                )}
                <div className="request-status">
                  <h2>Active Requests</h2>
                  {requests
                    .filter((request) => request.status === "active")
                    .map((request, index) => (
                      <div key={index} className="request-item">
                        <p>
                          You have{" "}
                          <span className="subject">{request.subject_id}</span>{" "}
                          class with{" "}
                          <span className="student-name">
                            {request.student}
                          </span>{" "}
                          at <span className="time">{request.time}</span>
                        </p>
                        <button
                          className="complete-button"
                          onClick={() => handleCompleteRequest(request.id)}
                        >
                          Mark Request Completed
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

export default ActiveSessions;
