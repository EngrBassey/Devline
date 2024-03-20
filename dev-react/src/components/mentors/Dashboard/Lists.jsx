import React, { useState, useEffect } from "react";
import "./listbox.css";
import MentorAuth from "../API";
import { Link } from "react-router-dom";

const MentorRequests = () => {
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

  const handleCompleteRequest = async (requestId) => {
    // Call the API to mark the request as completed
    try {
      const response = await MentorAuth.completeRequest(requestId);
      // Handle response
      console.log(response);
      if (response.success) {
        setSuccessMessage("Request marked as completed successfully.");
        // Update the status of the completed request after 2 seconds
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

  const handleAcceptRequest = async (requestId) => {
    // Call the API to accept the request
    try {
      const response = await MentorAuth.acceptRequest(requestId);
      if (response.success) {
        setSuccessMessage("Success");
        setTimeout(() => {
          setSuccessMessage("");
          setRequests((prevRequests) =>
            prevRequests.map((request) =>
              request.id === requestId
                ? { ...request, status: "active" }
                : request
            )
          );
        }, 2000);
      } else {
        setError("Failed to mark request as completed.");
      }
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  return (
    <div className="mentor-requests-container">
      {error && <p className="error-message">{error}</p>}
      {requests == undefined || requests === null || requests.length === 0 ? (
        <p className="no-requests-message">
          You have not received any requests yet
        </p>
      ) : (
        <>
          {error && <p className="error-message">{error}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          <div className="request-status">
            <h2>Pending Requests</h2>
            {requests
              .filter((request) => request.status === "pending")
              .map((request, index) => (
                <div key={index} className="request-item">
                  <p>
                    <span className="student-name">{request.student}</span> sent
                    you a request for{" "}
                    <span className="subject">{request.subject_id}</span> class
                    at <span className="time">{request.time}</span>
                  </p>
                  <button
                    className="accept-button"
                    onClick={() => handleAcceptRequest(request.id)}
                  >
                    Accept Request
                  </button>
                </div>
              ))}
          </div>
          <div className="request-status">
            <h2>Active Requests</h2>
            {requests
              .filter((request) => request.status === "active")
              .map((request, index) => (
                <div key={index} className="request-item">
                  <p>
                    You have{" "}
                    <span className="subject">{request.subject_id}</span> class
                    with <span className="student-name">{request.student}</span>{" "}
                    at <span className="time">{request.time}</span>
                  </p>
                  <button
                    className="complete-button"
                    onClick={() => handleCompleteRequest(request.id)}
                  >
                    Complete Request
                  </button>
                </div>
              ))}
          </div>
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
                    <Link to={`/mentor/request/${request.id}`}>
                      View Details
                    </Link>
                  </button>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MentorRequests;
