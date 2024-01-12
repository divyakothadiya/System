import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogInAndSignUp from './LoginAndSignUp/signup';
import LogIn from './LoginAndSignUp/login';
import DynamicFilterMapping from './DynamicFiltering/dynamicFilterMapping';

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/"  element={<LogInAndSignUp/>} />
          <Route exact path="/login"  element={<LogIn/>} />
          <Route exact path="/filter"  element={<DynamicFilterMapping/>} />

      </Routes>
    </Router>
  );
}

export default App;
