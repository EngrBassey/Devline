import React from 'react'
import './about.css'
import { TbTargetArrow } from "react-icons/tb"
import { IoSettingsOutline } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import Samuel from '../../assert/bassey.jpeg'
import Prisca from '../../assert/prisca.jpeg'
import Israel from '../../assert/israel.jpeg'


const About = () => {
    return (
        <div className='about-us-container'>
            <div className="how-section">
                <div className='first-txt'>
                    <h1>About Us</h1>
                    <p>Welcome to DevLine, where experienced developers mentor
                        and guide aspiring programmers on their journey to mastering programming
                        languages and technologies. Our mentorship program follows a
                        structured approach to ensure effective learning and support for every mentee
                    </p>
                </div>
            </div>
            <div className="mission-container">
                <div className="mission-box">
                    <TbTargetArrow size={50} />
                    <h3>Our Mission</h3>
                    <p>At DevLine, our mission is simple: to democratize access
                        to quality programming education and mentorship. We
                        believe that everyone deserves the opportunity to learn
                        and grow in the field of technology, regardless of their
                        background or circumstances. Through personalized mentorship,
                        hands-on projects, and a supportive community, we strive to inspire
                        and equip individuals to pursue their passion for
                        programming and achieve their career aspirations
                    </p>
                </div>
                <div className="mission-box">
                    <IoSettingsOutline size={50} />
                    <h3>Our Approach</h3>
                    <p>Central to our approach is the power of mentorship.
                        We understand that learning to code can be challenging,
                        and that's why we've curated a network of experienced
                        developers who are passionate about sharing their knowledge
                        and guiding others along their learning journey. Our mentorship
                        program pairs mentees with mentors who provide personalized guidance,
                        constructive feedback, and invaluable insights to help mentees achieve their
                        goals and unlock their full potential.
                    </p>
                </div>
            </div>
            <h2>Meet our Team Members</h2>
            <div className='top-section'>
                <p>Meet the passionate individuals behind DevLine who are
                    dedicated to making a positive impact in the world of
                    programming education and mentorship. Our team brings
                    together diverse expertise, ranging from software development
                    and education to community building and mentorship, united by a shared vision of
                    empowering individuals to thrive in the tech industry
                </p>
            </div>
            <div className="our-team-container">
                <div className="team-box">
                    <img src={Prisca} alt="" />
                    <h4>Prisca John</h4>
                    <p>Devline Founder / Backend Developer</p>
                    <div className="social-handle">
                        <a href="https://github.com/Priceless-P" target='_blank' className='links'><FaGithub size={25} /></a>
                        <a href="" target='_blank' className='links'><FaLinkedin size={25} /></a>
                        <a href="" target='_blank' className='links'><FaTwitterSquare size={25} /></a>
                    </div>
                </div>
                <div className="team-box">
                    <img src={Israel} alt="" />
                    <h4>Israel Udofia</h4>
                    <p>Backend Developer</p>
                    <div className="social-handle">
                        <a href="" target='_blank' className='links'><FaGithub size={25} /></a>
                        <a href="" target='_blank' className='links'><FaLinkedin size={25} /></a>
                        <a href="" target='_blank' className='links'><FaTwitterSquare size={25} /></a>
                    </div>
                </div>
                <div className="team-box">
                    <img src={Samuel} alt="" />
                    <h4>Samuel Bassey</h4>
                    <p>Frontend Developer</p>
                    <div className="social-handle">
                        <a href="https://github.com/EngrBassey" target='_blank' className='links'><FaGithub size={25} /></a>
                        <a href="https://www.linkedin.com/in/samuel-bassey-792006201/" target='_blank' className='links'><FaLinkedin size={25} /></a>
                        <a href="https://twitter.com/BasyonTech" target='_blank' className='links'><FaTwitterSquare size={25} /></a>
                    </div>
                </div>
            </div>
            <h2>Get Involved</h2>
            <div className='top-section'>
                <p>Ready to join the DevLine community? Whether
                    you're a seasoned developer interested in becoming a
                    mentor, an aspiring programmer eager to learn, or
                    someone simply passionate about supporting our mission,
                    there are many ways to get involved. Explore our mentorship program,
                    browse our resources, or reach out to learn more about
                    how you can contribute to our community.</p>
            </div>
            <button className="btn">Get Involved</button>
        </div>
    )
}

export default About
