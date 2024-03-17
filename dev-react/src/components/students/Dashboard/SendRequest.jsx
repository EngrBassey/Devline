import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NameContext } from "../../../App";
import StudentAuth from "../API";
import "./sendRequest.css";
import Aside from "./Aside";
import Header from "./Header";

const SendRequest = () => {
  const { selectedMentor } = useContext(NameContext);
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [flashMessage, setFlashMessage] = useState("");

  const mentorId = selectedMentor ? selectedMentor.id : null;

  const handleSubmit = async () => {
    if (selectedMentor === null || selectedMentor == undefined) {
      setFlashMessage("Please select a mentor before sending a request.");
      return;
    }

    try {
      const response = await StudentAuth.sendMentorshipRequest(
        mentorId,
        subjectId,
        message
      );

      if (response.success) {
        setFlashMessage("success");
        navigate("/dashboard");
      } else {
        // Handle other response cases if needed
      }
    } catch (error) {
      console.error("Error sending mentorship request:", error);
      // Handle error if needed
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
      <div className="send-request-container">
        <div className="request-form" onLoad={handleSubmit}>
          {flashMessage && <p className="flash-message">{flashMessage}</p>}
          <h2 className="form-title">
            Send Mentorship Request to{" "}
            {selectedMentor ? selectedMentor.fullname : "N/A"}
          </h2>
          {selectedMentor && (
            <>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="text"
                  value={selectedMentor.email}
                  readOnly
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Years of Experience:</label>
                <input
                  type="text"
                  value={selectedMentor.years_of_experience}
                  readOnly
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Time available:</label>
                <input
                  type="text"
                  value={
                    selectedMentor.time_available + " Tuesdays and Fridays"
                  }
                  readOnly
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Select a Subject:</label>
                <select
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select a Subject</option>
                  {selectedMentor &&
                    selectedMentor.subjects !== undefined &&
                    Object.keys(selectedMentor.subjects).map((key) => (
                      <option key={key} value={selectedMentor.subjects[key]}>
                        {selectedMentor.subjects[key]}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label>Message:</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-textarea"
                  placeholder="Enter your message here..."
                />
              </div>
              <button className="form-button" onClick={handleSubmit}>
                Send Request
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendRequest;
