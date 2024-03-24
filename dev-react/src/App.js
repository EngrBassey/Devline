import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import React, { useState, createContext } from "react";
import Home from "./components/Home";
import SignIn from "./components/students/Auth/SignIn";
import Register from "./components/students/Auth/Register";
import User from "./components/Logins/User";
import Mentor from "./components/mentors/Dashboard/Mentor";
import MentorProfile from "./components/mentors/Dashboard/Profile";
import "./App.css";
import AuthenticatedMentorRoute from "./components/mentors/Dashboard/AuthenticatedRoutes";
import MentorRegister from "./components/mentors/Auth/MentorRegister";
import MentorSignIn from "./components/mentors/Auth/MentorSignIn";
import Mentorjoin from "./components/Signupmentor/Mentorjoin";
import StudentDashboard from "./components/students/Dashboard/Dashboard";
import MentorList from "./components/students/Dashboard/Mentors";
import SendRequest from "./components/students/Dashboard/SendRequest";
import ActiveRequests from "./components/mentors/Dashboard/ActiveRequests";
import PendingRequest from "./components/mentors/Dashboard/PendingRequests";
import Request from "./components/mentors/Dashboard/Request";
import StudentProfile from "./components/students/Dashboard/StudentProfile";
import CompletedRequests from "./components/mentors/Dashboard/CompletedRequest";
import AuthenticatedStudentRoute from "./components/students/Dashboard/AuthenticatedRoute";
import ActiveSessions from "./components/students/Dashboard/ActiveSessions";
import CompletedSessions from "./components/students/Dashboard/CompletedSessions";
import ReviewMentorPage from "./components/students/Dashboard/ReviewMentor";
import MentorSearch from "./components/students/Dashboard/Search";
import AllMentors from "./AllMentors";
import About from "./components/about/About";
import Howitworks from "./components/howitworks/howitworks";
export const NameContext = createContext();

// Create a Context Provider
const NameContextProvider = ({ children }) => {
  const [selectedMentor, setSelectedMentor] = useState([]);

  return (
    <NameContext.Provider value={{ selectedMentor, setSelectedMentor }}>
      {children}
    </NameContext.Provider>
  );
};
function App() {
  return (
    <Router>
      <div className="App">
        <NameContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" Component={User} />
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/register" Component={Register} />
            <Route path="/register-mentor" Component={MentorRegister} />
            <Route path="/mentor-signin" Component={MentorSignIn} />
            <Route path="/mentor-join" Component={Mentorjoin} />
            <Route path="/search/:subject" element={<MentorSearch />} />
            <Route path="/mentors" element={<AllMentors />} />
            <Route path="/about" Component={About} />
            <Route path="/how" Component={Howitworks} />
            <Route element={<AuthenticatedMentorRoute />}>
              <Route path="/active-requests" Component={ActiveRequests} />
              <Route path="/completed-requests" Component={CompletedRequests} />
              <Route path="/pending-requests" Component={PendingRequest} />
              <Route path="/mentor/profile" Component={MentorProfile} />
              <Route path="/mentor/request/:id" Component={Request} />
              <Route path="/mentor/dashboard" Component={Mentor} />
            </Route>

            <Route element={<AuthenticatedStudentRoute />}>
              <Route
                path="/student/completed-sessions"
                element={<CompletedSessions />}
              />
              <Route path="/all-mentors" element={<MentorList />} />
              <Route path="/send-request/:mentorId" element={<SendRequest />} />
              <Route path="/dashboard" element={<StudentDashboard />} />
              <Route
                path="/review/mentor/:requestId"
                element={<ReviewMentorPage />}
              />
              <Route path="/student/profile" element={<StudentProfile />} />
            </Route>
            <Route
              path="/student/active-sessions"
              element={<ActiveSessions />}
            />
          </Routes>
        </NameContextProvider>
      </div>
    </Router>
  );
}
export default App;
export { NameContextProvider };
