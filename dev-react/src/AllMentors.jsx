import React, { useState, useEffect, useContext } from "react";
import "./components/students/Dashboard/search.css";
import { MdColorLens, MdOutlineAccessTime } from "react-icons/md";

const AllMentors = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch("http://devline.live/api/mentor/mentors");
        const data = await response.json();
        setMentors(data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors();
  }, []);

  return (
    <div className="nav-bar">
      <div className="main-container">
        <div className="main-cards">
          <div className="main-title">
            <h2>Mentors</h2>
            <br />
          </div>
          <div className="cards">
            {mentors.map((mentor) => (
              <div key={mentor.id}>
                <div className="box-req">
                  <MdOutlineAccessTime size={40} />
                  <h3>{mentor.fullname}</h3>
                  <p>
                    <b>Email:</b> {mentor.email}
                  </p>
                  <p>
                    <b>Years of Experience:</b> {mentor.years_of_experience}
                  </p>
                  <ul>
                    <p>
                      <b>Areas of Concentration: </b>
                    </p>
                    {mentor.subjects.map((subject, subIndex) => (
                      <li key={subIndex}>
                        <p>{subject}</p>
                      </li>
                    ))}
                  </ul>
                  <p>
                    <b>Time available:</b> {mentor.time_available} Tuesdays and
                    Fridays
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AllMentors;
