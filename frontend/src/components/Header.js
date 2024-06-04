/*
  Modified by: Alan Espana
  CS 232 - Capstone II
  Final Project App - Tally Down
  Last updated: 6/3/2024
*/
// HeaderHome, HeaderTimer, HeaderInfo images: https://iconmonstr.com/

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import TimerGif from "../assets/Timer.gif";
import HeaderHome from "../assets/headerHome.png";
import HeaderTimer from "../assets/headerTimer.png";
import HeaderInfo from "../assets/headerInfo.png";

export default function AppHeader() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="jaro-Title">
        <span className="T">T</span>ally <span className="D">D</span>own <img src={TimerGif} alt="Moving Timer" className="animatedTimer" />
        </h1>
      </div>                                                            
      <nav>
        <ul className='nav-list'>
          <li className='nav-item left'>           
            <Link to="/">
            <img src={HeaderHome} alt="House img" className="headerHome" /> Home</Link>
          </li>
          <li className='nav-item left'>
              <Link to="/add-timer"><img src={HeaderTimer} alt="Clock img" className="headerTimer" /> Add a Timer</Link>
          </li>
          <li className='nav-item right'>
            <Link to="/about">About <img src={HeaderInfo} alt="Info img" className="headerInfo" /></Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
  
