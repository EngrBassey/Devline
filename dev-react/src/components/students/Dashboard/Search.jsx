import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StudentAuth from "../API";
import './search.css'
import Navbar from "../../navbar/Navbar";

import Mentor from "../../../assets/mentor.jpeg";

const Search = () => {
  const { subject } = useParams();
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await StudentAuth.searchMentor({ subject: subject });
        if (response.success) {
          setMentors(response.mentors);
          setLoading(false);
          setError(null);
        } else {
          setError("No mentors found.");
          console.log(response.message)
          setLoading(false);
        }
      } catch (error) {
        console.error("Error searching for mentors:", error);
        setError("An error occurred while searching for mentors.");
        setLoading(false);
      }
    };

    fetchMentors();
  }, [subject]);

  return (
    <div className='nav-bar'>
    <Navbar />
    <div className="search">
      <div>
        <h1>Search Results for {subject}</h1>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <div>
          {mentors.map((mentor) => (
            <div key={mentor.id} className="mentor-card">
            <img src={Mentor} alt="mentor"/>
              <h2>{mentor.fullname}</h2>
              <p>Email: {mentor.email}</p>
              <p>Years of Experience: {mentor.years_of_experience}</p>
              <ul>
                {mentor.subjects.map((subject, index) => (
                  <li key={index}>{subject}</li>
                ))}
              </ul>
              <p>Time Available: {mentor.time_available}</p>
              {/* Add more mentor details as needed */}
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Search;
