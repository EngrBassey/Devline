import React, { useState, useEffect } from "react";
import "./listbox.css";
import MentorAuth from "../API";
import Sidebar from './Sidebar';
import Nav from './Nav';

const PendingRequest = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState('');
  const id = localStorage.getItem("mentor_id");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/mentor/requests",
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

  const handleAcceptRequest = async (requestId) => {
    // Call the API to accept the request
    try {
      const response = await MentorAuth.acceptRequest(requestId);
      if (response.success) {
        setSuccessMessage('Success');
        setTimeout(() => {
            setSuccessMessage('');
        setRequests(prevRequests =>
            prevRequests.map(request =>
                request.id === requestId ? { ...request, status: 'active' } : request
            )
        );
    }, 2000);
} else {
    setError('Failed to mark request as completed.');
}
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
      <div className='grid-container'>
          <Nav OpenSidebar={OpenSidebar} />
          <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
          <div className="tracking">
    <div className="mentor-requests-container">
      {error && <p className="error-message">{error}</p>}
      {requests === null || requests === undefined ? (
        <p className="no-requests-message">You have not received any requests yet</p>
      ) : (
        <>
        {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
          <div className="request-status">
            <h2>Pending Requests</h2>
            {requests
              .filter((request) => request.status === "pending")
              .map((request, index) => (
                <div key={index} className="request-item">
                  <p>
                    <span className="student-name">{request.student}</span> sent you a request for{" "}
                    <span className="subject">{request.subject_id}</span> class at{" "}
                    <span className="time">{request.time}</span>
                  </p>
                  <button className="accept-button" onClick={() => handleAcceptRequest(request.id)}>
                    Accept Request
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

export default PendingRequest;
