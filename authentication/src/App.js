import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogInAndSignUp from './LoginAndSignUp/signup';
import LogIn from './LoginAndSignUp/login';
import DynamicFilterMapping from './DynamicFiltering/dynamicFilterMapping';
import PersistentDrawerLeft from './NavBar/navigationbar';
import UserComponent from './UserProfile/userComponent';
import ChatDashboard from './ChatApplication/chatDashboard';

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/homepage"  element={<LogInAndSignUp/>} />
          <Route exact path="/login"  element={<LogIn/>} />
          <Route exact path="/filter"  element={<DynamicFilterMapping/>} />
          <Route exact path="/navbar"  element={<PersistentDrawerLeft/>} />
          <Route exact path="/userdetails"  element={<UserComponent/>} />
          <Route exact path="/"  element={<ChatDashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
