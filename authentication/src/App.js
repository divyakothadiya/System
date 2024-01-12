import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogInAndSignUp from './LoginAndSignUp/signup';
import LogIn from './LoginAndSignUp/login';
import DynamicFilterMapping from './DynamicFiltering/dynamicFilterMapping';
import PersistentDrawerLeft from './NavBar/navigationbar';
import UserComponent from './UserProfile/userComponent';

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/"  element={<LogInAndSignUp/>} />
          <Route exact path="/login"  element={<LogIn/>} />
          <Route exact path="/filter"  element={<DynamicFilterMapping/>} />
          <Route exact path="/navbar"  element={<PersistentDrawerLeft/>} />
          <Route exact path="/userdetails"  element={<UserComponent/>} />
      </Routes>
    </Router>
  );
}

export default App;
