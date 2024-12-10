// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ConcertList from './ConcertList';
import ConcertDetails from './ConcertDetails';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<ConcertList />} />
          <Route path="/concert/:id" element={<ConcertDetails />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

const Header = () => (
  <header className="header">
    <div className="header-content">
      <div className="logo-container">
        <img
          src="/logo.png"
          alt="Festival Carthage Logo"
          className="site-logo"
        />
        <h1 className="site-title">Festival Carthage</h1>
      </div>
      <nav className="nav-menu">
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
);

const Footer = () => (
  <footer className="footer">
    <p>&copy; 2024 Festival Carthage. All Rights Reserved.</p>
  </footer>
);

export default App;
