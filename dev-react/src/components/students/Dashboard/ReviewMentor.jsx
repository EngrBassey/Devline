import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StudentAuth from "../API";
import "./ReviewMentorPage.css";
import Aside from "./Aside";
import Header from "./Header";

const ReviewMentorPage = () => {
  const { requestId } = useParams(); // Get the ID from the URL parameter
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await StudentAuth.reviewMentor(
        requestId,
        rating,
        reviewText
      );
      if (response.success) {
        setSuccessMessage("Review submitted successfully.");
      } else {
        setError("Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setError("An error occurred while submitting review.");
    }
  };

  // Function to render stars based on rating value
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => setRating(i)}
          className={i <= rating ? "star selected" : "star"}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  useEffect(() => {
    let timer;
    if (successMessage || error) {
      timer = setTimeout(() => {
        setSuccessMessage("");
        setError("");
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [successMessage, error]);

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Aside openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div className="review-mentor-container">
        <h2 className="review-title">Review Mentor</h2>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div className="rating-section">
          <label className="rating-label">Rating:</label>
          <div className="stars">{renderStars()}</div>
        </div>
        <label className="review-label">Review Text:</label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="review-textarea"
          placeholder="Write your review here..."
        />
        <button onClick={handleSubmit} className="submit-button">
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ReviewMentorPage;
