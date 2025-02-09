import React from "react";
import Landing from "./comp/Landing";
import Login from "./comp/Login";
import Signup  from "./comp/Signup";
import Dashboard from "./comp/Dashboard";
import Loginguest from "./comp/Loginguest";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import AttendeesList from "./comp/AttendeesList";
const App = () => {
  return (
    // <Dashboard />
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/guest" element={<Loginguest />} />
        <Route path="/AttendeesList" element={<AttendeesList />} />
      </Routes>
    </Router>
  );
};

export default App;
