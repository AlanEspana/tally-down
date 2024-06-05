/*
  Modified by: Alan Espana
  CS 232 - Capstone II
  Final Project App - Tally Down
  Last updated: 5/29/2024
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Future login implementation
  // StrictMode is a development mode feature for highlighting potential problems
  // Included from Routes video // https://www.youtube.com/watch?v=TWz4TjSssbg
  <React.StrictMode>
    {true ? <App /> : "Please login"}
  </React.StrictMode>
);


