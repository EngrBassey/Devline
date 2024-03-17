import React, { useState, useEffect } from "react";
import "../../mentors/mentor.css";
import { AiFillAlert } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import { FaUsers } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import "./home.css";
import StudentAuth from "../API";
import MentorSearch from "./Search"; // Import the MentorSearch component

const StudentHome = () => {
  const [mentorshipRequests, setMentorshipRequests] = useState([]);
  // const [showMentorSearch, setShowMentorSearch] = useState(false); // State to toggle MentorSearch visibility
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await StudentAuth.getRequests();
        if (response.success) {
          setMentorshipRequests(response.requests);
          setMessage(response.message);
        } else {
          setMessage(response.message);
          console.error(
            "Failed to fetch mentorship requests:",
            response.message
          );
        }
      } catch (error) {
        console.error("Error fetching mentorship requests:", error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="main-container">
      <div className="main-title">
        <h3>STUDENT DASHBOARD</h3>
        {message && <p>{message}</p>}
      </div>
      <div className="cards">
        {mentorshipRequests.length === 0 ? (
          <div className="center-container">
            <p>You have not sent any mentorship request.</p>
            {/* <button className="btn logout" onClick={() => setShowMentorSearch(true)}>Search for a mentor</button> */}
          </div>
        ) : (
          mentorshipRequests.map((request, index) => (
            <div key={index} className="card">
              <div className="card-content">
                {/* <img
                  className="card-image"
                  src={request.subject.img}
                  alt={`img-${index}`}
                /> */}

                <h3 className="card-title">{request.message}</h3>
                <p className="card-info">Status: {request.status}</p>
                <p className="card-info">With {request.mentor}</p>
                <p className="card-info">Time: {request.time}</p>
                <p className="card-info">Request on {request.created_at}</p>
              </div>
            </div>
          ))
        )}
      </div>
      {/* {showMentorSearch && <MentorSearch />} Render MentorSearch component conditionally */}
    </div>
  );
};

export default StudentHome;
