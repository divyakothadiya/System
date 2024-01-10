import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './LoginAndSignUp/signup';
import LogIn from './LoginAndSignUp/login';

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/"  element={<LogIn/>} />
          <Route exact path="/signup"  element={<SignUp/>} />
      </Routes>
    </Router>
  );
}

export default App;
