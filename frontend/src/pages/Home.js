/*
  Modified by: Alan Espana
  CS 232 - Capstone II
  Final Project App - Tally Down
  Last updated: 6/5/2024
*/

// HomeTimer https://undraw.co/search
// Google Fonts https://fonts.google.com/selection
// Javascript https://chat.openai.com/chat
// homeTimer image https://undraw.co/illustrations 

import React, { useEffect, useState } from 'react';
import AppHeader from '../components/Header';
import AppFooter from '../components/Footer';
import './HomePage.css';
import { calculateEndDate, saveTimersToLocalStorage, getTimersFromLocalStorage } from '../components/timerUtils';
import HomeGarbage from "../assets/homeGarbage.png";
import HomeTimer from "../assets/homeTimer.png";

export default function Home() {
    const [timers, setTimers] = useState(getTimersFromLocalStorage);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [finishedTimerIds, setFinishedTimerIds] = useState(new Set());

    // Handle timer updates every second
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimers(timers => {
                const updatedTimers = timers.map(timer => {
                    const elapsed = Math.floor((Date.now() - timer.lastUpdated) / 1000);
                    const remaining = timer.remaining - elapsed;
                    if (remaining > 0) {
                        return { ...timer, remaining, lastUpdated: Date.now() };
                    } else {
                        if (!popupVisible && !finishedTimerIds.has(timer.id)) {
                            setPopupMessage('Timer done! Add another one on the "Add a Timer" page');
                            setPopupVisible(true);
                            setFinishedTimerIds(prevIds => new Set(prevIds).add(timer.id));
                            setTimeout(() => {
                                handleDeleteTimer(timer.id);
                            }, 5000);
                        }
                        return { ...timer, remaining: 0, lastUpdated: Date.now() };
                    }
                });
                saveTimersToLocalStorage(updatedTimers);
                return updatedTimers;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timers, popupVisible, finishedTimerIds]);

    // Deletes a timer
    const handleDeleteTimer = (id) => {
        const updatedTimers = timers.filter(timer => timer.id !== id);
        setTimers(updatedTimers);
        saveTimersToLocalStorage(updatedTimers);
    };

    // Close the popup
    const handleClosePopup = () => {
        setPopupVisible(false);
    };

    // Calculates the SVG radius for the timer circle
    const calculateRadius = (remaining, total) => {
        return (remaining / total) * 360;
    };

    // SVG component for the countdown circle
    const SVGCircle = ({ radius }) => (
        <svg className='countdown-svg'>
            <path fill="none" stroke="#0761a6" strokeWidth="4" d={describeArc(100, 100, 98, 0, radius)}/>
        </svg>
    );

    return (
        <>
            <AppHeader />
            <h2 className="homeTitle">Your Timers Live Here</h2>
            <div className="homeTimers">
                <div className="homeList">
                    <div className="homeTimerRow">
                        <div className="homeHeaderCell">Timer</div>
                        <div className="homeHeaderCell">Title</div>
                        <div className="homeHeaderCell">End Date</div>
                        <div className="homeHeaderCell">Actions</div>
                    </div>
                    {timers.map(timer => (
                        <div key={timer.id} className="homeTimerItem">
                            <div className="homeCellTimer">
                                <div className="countdown-item">
                                    <SVGCircle className='svgCircle' radius={calculateRadius(timer.remaining, timer.duration)} />
                                    <div className="timer-text">
                                        <span>{Math.floor(timer.remaining / (3600 * 24))}d</span>
                                        <span>{Math.floor((timer.remaining % (3600 * 24)) / 3600)}h</span>
                                        <span>{Math.floor((timer.remaining % 3600) / 60)}m</span>
                                        <span>{timer.remaining % 60}s</span>
                                    </div>
                                </div>
                            </div>
                            <div className="homeCellTitle">
                                {timer.title}
                            </div>
                            <div className="homeCellEndDate">
                                {calculateEndDate(timer.remaining)}
                            </div>
                            <div className="homeCellDelete">
                                <button className='homeDelete'onClick={() => handleDeleteTimer(timer.id)}><img src={HomeGarbage} alt="garbage img" className="homeGarbage" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {timers.length === 0 && (
                <div className='clockContainer'>
                    <img src={HomeTimer} alt="clock img" className="homeTimer" />
                    <div className="noTimersText">No Timers Added.</div>
                </div>
            )}
            {popupVisible && (
                <div className="popupMessage">
                    {popupMessage}
                    <button onClick={handleClosePopup}>OK</button>
                </div>
            )}
            <AppFooter />
        </>
    );
}

// Circle functions-
// https://codepen.io/FlorinPop17/pen/YbpwyG
// https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle

// Convert polar coordinates to cartesian
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

// Describes an SVG arc path
function describeArc(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}