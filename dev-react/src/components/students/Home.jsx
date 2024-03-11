import React from 'react';
import '../mentors/mentor.css';
import { AiFillAlert } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import { FaUsers } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import './home.css'

const cards = [
    {
        name: 'Cloud Computing Fundamentals',
        img: require('../../asserts/cloud-img.jpg'),
        mentor: 'Fred Smith',
        time: '4PM WAT'
    },
    {
        name: 'JavaScripts for Beginners',
        img: require('../../asserts/js-img.png'),
        mentor: 'Samuel Leads',
        time: '1PM WAT'
    }
];

const Home = () => {
    return (
        <div className='main-container'>
            <div className="main-title">
                <h3>STUDENT DASHBOARD</h3>
            </div>
            <div className="main-cards">
                <div className="card">
                    <h2>Requests status</h2>
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
            </div>
            <div className="main-title">
                <h3>Your Paired Request</h3>
            </div>
            <div className="cards">
                {cards.map((items, index) => (
                    <div key={index} className="cards-status">
                        <div>
                            <img src={items.img} alt={`img-${index}`} />
                        </div>
                        <h3>{items.name}</h3>
                        <p>With {items.mentor}</p>
                        <p>Time: {items.time}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Home
