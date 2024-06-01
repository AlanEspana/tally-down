/*
  Modified by: Alan Espana
  CS 232 - Capstone II
  Final Project App - Tally Down
  Last updated: 5/29/2024
*/

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import timer from "../assets/Timer.gif";

export default function AppHeader() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="jaro-Title">
        <span className="T">T</span>ally <span className="D">D</span>own <img src={timer} alt="Moving Timer" className="animatedTimer" />
        </h1>
      </div>                                                            
      <nav>
        <ul className='nav-list'>
          <li className='nav-item left'>
            <Link to="/add-timer">Add Timer</Link>
          </li>
          <li className='nav-item right'>
            <Link to="/">Home</Link>
          </li>
          <li className='nav-item right'>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
  
