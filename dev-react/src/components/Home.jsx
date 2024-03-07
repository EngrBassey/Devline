import React from 'react';
import Navbar from './navbar/Navbar';
import Header from './header/Header';
import Feature from './feature/Feature';
import Course from './courses/Course';
import Brands from './brands/Brands';
import Footer from './footer/Footer';
import logo from '../logo.svg';
import '../App.css';
const Home = () => {
  return (
    <div className="Home">
    <div className='nav-bar'>
      <Navbar />
      <Header />
      </div>
      <Feature />
      <Course />
      <Brands />
      <Footer />
    </div>
  );
};

export default Home;
