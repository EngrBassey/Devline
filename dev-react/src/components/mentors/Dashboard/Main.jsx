import React from 'react';
import '../mentor.css';
import Lists from './Lists';
import { AiFillAlert } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import { FaUsers } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

const Main = () => {
    return (
        <div className='main-container'>
            <div className="main-title">
                <h3>DASHBOARD</h3>
            </div>
            {/* <div className="main-cards"> */}
                {/* <div className="card">
                    <h2>Requests</h2>
                    <AiFillAlert className='card_icon' />
                </div>
                <div className="card">
                    <h2>Sessions</h2>
                    <SiGoogleclassroom className='card_icon' />
                </div>
                <div className="card">
                    <h2>Community</h2>
                    <FaUsers className='card_icon' />
                </div>
                <div className="card">
                    <h2>Messages</h2>
                    <FaMessage className='card_icon' />
                </div>
            </div> */}
            <div className="tracking">
                <div className="">
                    <Lists />
                </div>
                <div className='student lists'>
                </div>
            </div>
        </div>
    )
}

export default Main