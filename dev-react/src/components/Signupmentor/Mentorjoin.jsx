import React from 'react'
import { Link } from "react-router-dom";
import './join.css'
import { FaHeadSideVirus } from "react-icons/fa6";
import { MdWorkspacePremium } from "react-icons/md";
import { MdOutlineAccessTime } from "react-icons/md";

const Mentorjoin = () => {
    return (
        <div className='mentor-contanier'>
            <div className="section-head">
                <div className="head-contents">
                    <h1>Apply to Become DevLine Mentor</h1>
                    <p>Be a developers who is willing to share her knowledge with young developers.</p>
                </div>
            </div>
            <h1>Requirements</h1>
            <div className="requirement-section">
                <div className="box-req">
                    <FaHeadSideVirus size={40} className='m-icons' />
                    <h3>Proficiency</h3>
                    <p>Proficiency in relevant programming languages and technologies</p>
                </div>
                <div className="box-req">
                    <MdWorkspacePremium size={40} className='m-icons' />
                    <h3>Experience</h3>
                    <p>Previous experience in mentoring or teaching</p>
                </div>
                <div className="box-req">
                    <MdOutlineAccessTime size={40} className='m-icons' />
                    <h3>Availability</h3>
                    <p>Being available for regular mentoring sessions, either in person or online</p>
                </div>
            </div>
            <div className="apply-btn">
                <button className="btn"><Link to="/register-mentor">Apply Now</Link></button>
            </div>
            <div className="ourmentors-profile">
                <div className="m-profile">
                </div>
                <div className="m-profile"></div>
                <div className="m-profile"></div>
                <div className="m-profile"></div>
            </div>
        </div>
    )
}

export default Mentorjoin
