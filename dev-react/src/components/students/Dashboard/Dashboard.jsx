// Dashboard.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from './Header';
import Aside from './Aside';
import StudentHome from './Home';
import StudentProfile from './StudentProfile';
import MentorSearch from './Search';


const StudentDashboard = ({ isAuthenticated }) => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle);
    };

    const [openModal, setOpenModal] = useState(false);

    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Aside openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} onClick={() => setOpenModal(true)} />
            
            <StudentHome />
            <Routes>

            {/* <MentorList path="/"/> */}
            </Routes>
            {/* <MentorSearch path="/student/mentor/search"/> */}
            {/* <StudentProfileModal showProfileModal={showProfileModal} toggleProfileModal={toggleProfileModal} /> */}
        </div>
    )
}

export default StudentDashboard;
