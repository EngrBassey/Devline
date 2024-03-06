import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import SignIn from './components/Logins/SignIn';
import Register from './components/Logins/Register';
import User from './components/Logins/User';


function App() {
    return (
      <Router>
        <div className="App">
        <Home />
          <Routes>
            <Route path="/signin" Component={SignIn} />
            <Route path="/register" Component={Register} />
            <Route path="/user" Component={User} />
          </Routes>
        </div>
      </Router>
    );
  }


export default App;