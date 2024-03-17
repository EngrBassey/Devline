import React, { useState } from "react";

const MentorshipRequestModal = ({ mentor, subject, onClose, onSendRequest }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendRequest(message);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h2>Send Mentorship Request</h2>
        {/* <p>Mentor: {mentor.fullname}</p>
        <p>Subject: {subject}</p> */}
        <form onSubmit={handleSubmit}>
          <label>
            Message:
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </label>
          <button type="submit">Send Request</button>
        </form>
      </div>
    </div>
  );
};

export default MentorshipRequestModal;
