import logo from './logo.svg';
import Navbar from './components/navbar/Navbar';
import Header from './components/header/Header';
import Feature from './components/feature/Feature';
import Course from './components/courses/Course';
import Brands from './components/brands/Brands';
import Footer from './components/footer/Footer';
import SignIn from './components/Logins/SignIn';
import Register from './components/Logins/Register';
import User from './components/Logins/User';
import Mentor from './components/mentors/Mentor';
import Student from './components/students/Student';
import Mentorjoin from './components/Signupmentor/Mentorjoin';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <div className='nav-bar'>
        <Navbar />
        <Header />
      </div>
      <Feature />
      <Course />
      <Brands />
      <Footer /> */}
{/*       <SignIn />
      <Register />
      <User /> */}
{/*       <Mentor />
      <Student /> */}
      <Mentorjoin />
    </div>
  );
}

export default App;