import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';  // Your main component
import { BrowserRouter } from 'react-router-dom';  // Import the Router

ReactDOM.render(
  <BrowserRouter> {/* Wrap the App component in Router */}
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
