import React from 'react';
import { FaStar } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import './course.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const learn = [
    'React/Redux',
    'Tailwind CSS',
    'Solidity',
    'Advance JS',
    'AI Master class',
    'Server Management',
    'DeveOps',
    'Data Science',
    'PowerPI',
    'Robotic',
    'C++'
];
const course = [
    {
        name: 'Cloud Computing Fundamentals',
        img: require('../../asserts/cloud-img.jpg'),
        starImg: ''
    },
    {
        name: 'JavaScripts for Beginners',
        img: require('../../asserts/js-img.png'),
        starImg: ''
    },
    {
        name: 'Ethical Hacking',
        img: require('../../asserts/hacking-img.jpg'),
        starImg: ''
    },
    {
        name: 'Blockchain Development Fundamentals',
        img: require('../../asserts/blockchain.jpg'),
        starImg: ''
    },
    {
        name: 'Python Crash Course',
        img: require('../../asserts/python-icon.jpg'),
        starImg: ''
    }
];

const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="arrow next" onClick={onClick}>
            <FaArrowRight className='arrow-right' />
        </div>
    );
};
const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="arrow prev" onClick={onClick}>
            <FaArrowLeft className="arrow-left" />
        </div>
    );
};
const Course = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4, // Show 3 slides at a time
        slidesToScroll: 1, // Scroll 1 slide at a time
        nextArrow: <NextArrow />, // Custom next arrow component
        prevArrow: <PrevArrow />, // Custom previous arrow component
        responsive: [
            {
                breakpoint: 1024, // Adjust settings for medium screens
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768, // Adjust settings for small screens
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2,
                }
            }
        ]
    };
    return (
        <div className='carousel'>
            <div className="carousel-box">
                <h2>Top rated courses</h2>
                <Slider className='ment' {...settings}>
                    {course.map((item, index) => (
                        <div key={index} className="box">
                            <div>
                                <img src={item.img} alt={`img-${index}`} />
                            </div>
                            <h3>{item.name}</h3>
                            <p>Get a mentor</p>
                            <div className='progress-box'>
                                {[...Array(5)].map((_, starIndex) => (
                                    <FaStar className='progress-star' key={starIndex} size={15} />
                                ))}
                            </div>

                        </div>
                    ))}
                </Slider>
            </div>
            <div className="course-lists">
                {learn.map((i) => (
                    <button className='btn-list'><a href="">{i}</a></button>
                ))}
            </div>
        </div>
    );
};

export default Course;