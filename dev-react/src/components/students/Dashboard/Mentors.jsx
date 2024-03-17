import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../mentors/mentor.css";
import Header from "./Header";
import { NameContext } from "../../../App";
import Aside from "./Aside";
import { MdColorLens, MdOutlineAccessTime } from "react-icons/md";
// import Modal from './Modal'; // Import the modal component
// import MentorshipRequestModal from "./MentorshipRequestModal";
import "./home.css";
// ...imports

const MentorList = () => {
  const [mentors, setMentors] = useState([]);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { setSelectedMentor } = useContext(NameContext);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/mentor/mentors"
        );
        const data = await response.json();
        setMentors(data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors();
  }, []);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleSelectMentor = (mentor) => {
    console.log(mentor);
    setSelectedMentor(mentor);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Aside
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        onClick={() => setOpenModal(false)}
      />
      <div className="main-container">
        <div className="main-cards">
          <div className="main-title">
            <h2>Mentors</h2>
            <br />
          </div>
          <div className="cards">

            {mentors.map((mentor) => (
              <div key={mentor.id} >
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


                <Link

                onClick={() => handleSelectMentor(mentor)}
                  to={`/send-request/${mentor.id}`}
                  className="btn logout"
                >
                  Send Request
                </Link>
              </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorList;
