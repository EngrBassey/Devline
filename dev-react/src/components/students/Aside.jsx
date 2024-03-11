import React from 'react';
import { FaUserCircle } from "react-icons/fa";

const Aside = ({openSidebarToggle, OpenSidebar}) => {
    return (
        <aside id='sidebar' className={openSidebarToggle ? "sidebar-toggle" : ""}>
            <div className='sidebar-title'>
                <div className="sitebar-brand">
                    <FaUserCircle size={80} />
                    <h3>Prisca John</h3>
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>
            <ul className='sidebar-list'>
                <li className="sidebar-list-item">
                    <a href="">Update Profile</a>
                </li>
                <li className="sidebar-list-item">
                    <a href="">Get a Course</a>
                </li>
                <li className="sidebar-list-item">
                    <a href="">My Courses</a>
                </li>
                <li className="sidebar-list-item">
                    <a href="">Resorces Library</a>
                </li>
                <button className="btn logout">Logout</button>
            </ul>
        </aside>
    )
}
export default Aside
