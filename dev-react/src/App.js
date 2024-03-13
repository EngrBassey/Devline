import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/Logins/SignIn';
import Register from './components/Logins/Register';
import User from './components/Logins/User';
import Mentor from './components/mentors/Mentor';
import Student from './components/students/Student';
import Mentorjoin from './components/Signupmentor/Mentorjoin';
import './App.css';
import MentorRegister from './components/Logins/MentorRegister';
import MentorSignIn from './components/Logins/MentorSignIn';
// import './App.css';

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
