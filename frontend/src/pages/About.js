/*
  Modified by: Alan Espana
  CS 232 - Capstone II
  Final Project App - Tally Down
  Last updated: 5/29/2024
*/

import AppHeader from '../components/Header';
import AppFooter from '../components/Footer';
import './AboutPage.css';
import fastTimer from "../assets/fastTimer.png";

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
                    for his CS 232: Capstone Application Development II class. This application is useful for making that special 
                    occasion that much more noteworthy. Watch the time go down as you get closer to your birthday, wedding,
                    holiday gathering, or any other exceptional event.
                </div>
            <AppFooter />
        </>
    );
}