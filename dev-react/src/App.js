import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/Logins/SignIn';
import Register from './components/Logins/Register';
import User from './components/Logins/User';
import Mentor from './components/mentors/Mentor';
import Student from './components/students/Student';
import './App.css';
import MentorRegister from './components/Logins/MentorRegister';
import MentorSignIn from './components/Logins/MentorSignIn';
// import './App.css';

function App() {
    return (
      <Router>
        <div className="App">
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" Component={User} />
            <Route path="/signin" Component={SignIn} />
            <Route path="/register" Component={Register} />
            <Route path="/register-mentor" Component={MentorRegister} />
            <Route path="/signin-mentor" Component={MentorSignIn} />
          </Routes>
        </div>
      </Router>
    );
  }
export default App;
