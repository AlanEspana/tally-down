/*
  Modified by: Alan Espana
  CS 232 - Capstone II
  Final Project App - Tally Down
  Last updated: 5/27/2024
*/

// Google email href https://stackoverflow.com/questions/6548570/url-to-compose-a-message-in-gmail-with-full-gmail-interface-and-specified-to-b

import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function AppFooter() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>
                    &copy; 2024 - Tally Down - Made by: Alan Espana - V1.33.0                    
                </p>
                
            </div>
            <a className='sendEmail'>
                Questions? Send me an email:
            </a>
            <a className='googleEmail' href="https://mail.google.com/mail/?view=cm&fs=1&to=alan16espana@gmail.com&su=Subject:&body=Body:" target="_blank" rel="noopener noreferrer">
                alan16espana@gmail.com
            </a>            
        </footer>
    );
}