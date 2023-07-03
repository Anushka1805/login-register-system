import React from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import './App.css';
import Login from './login';
import Register from './register';

function App() {
  return (
    <>
      <Router>
      <Link to="/login"></Link>
      <Link to="/register"></Link>
      <Link to="/"></Link>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path = "/register" element = {<Register />} />
        <Route path = "/" element = {<Login />} />
      </Routes>
      </Router>
    </>
  );
}

export default App;
