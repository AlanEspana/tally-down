/*
  Modified by: Alan Espana
  CS 232 - Capstone II
  Final Project App - Tally Down
  Last updated: 6/4/2024
*/
// images: https://iconmonstr.com/
// google email link: https://stackoverflow.com/questions/6548570/url-to-compose-a-message-in-gmail-with-full-gmail-interface-and-specified-to-b 

import React from 'react';
import AppHeader from '../components/Header';
import AppFooter from '../components/Footer';
import './AboutPage.css';
import fastTimer from "../assets/fastTimer.png";
import AboutGithub from "../assets/aboutGithub.png";
import AboutEmail from "../assets/aboutEmail.png";

export default function About() {
    return (
        <>
            <AppHeader />
            <h3 className="aboutHeader">About This Site</h3>
                <div className="aboutImageContainer">
                <img
                    src={fastTimer}
                    alt="Quick Timer img"
                    className="fastTimer"
                />
                </div>
                <div className="aboutText">
                    Time is always moving faster than we can catch. This app was made to help you count the time down for those special occasions.
                    This website application was made and developed by Alan Espana as a final 
                    for his CS232 - Capstone Application Development II class. This application is useful for making that special 
                    occasion that much more noteworthy. Watch the time go down as you get closer to your birthday, wedding,
                    holiday gathering, or any other exceptional event.
                </div>
                <div className='contactBox'>
                    <div className='contactTitle'>
                        Contact Me:
                    </div>
                    <div className='githubBox'>
                        Check for the latest app update through:
                        <a className='aboutGithub' href="https://github.com/AlanEspana/tally-down" target="_blank" rel="noreferrer">
                            <img src={AboutGithub} alt="GitHub img" className="githubImage" /> GitHub 
                        </a>
                    </div>                 
                    <div className='emailBox'>
                        Get in touch with me through email:
                        <a className='aboutEmail' href="https://mail.google.com/mail/?view=cm&fs=1&to=alan16espana@gmail.com&su=Subject:&body=Body:" target="_blank" rel="noopener noreferrer">
                            <img src={AboutEmail} alt="Email img" className="emailImage" />
                        </a>
                    </div>
                </div>
            <AppFooter />
        </>
    );
}
