/*
  Modified by: Alan Espana
  CS 232 - Capstone II
  Final Project App - Tally Down
  Last updated: 6/5/2024
*/
// Javascript help https://chat.openai.com/chat

import AppHeader from '../components/Header';
import AppFooter from '../components/Footer';
import './TimersPage.css';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import downarrowcircle from "../assets/downArrowCircle.png";
import { calculateEndDate, saveTimersToLocalStorage, getTimersFromLocalStorage } from '../components/timerUtils';
import TimerReset from "../assets/timerReset.png";
import TimerGarbage from "../assets/timerGarbage.png";

export default function AddTimer() {
    const [hoursInput, setHoursInput] = useState('');
    const [minutesInput, setMinutesInput] = useState('');
    const [secondsInput, setSecondsInput] = useState('');
    const [titleInput, setTitleInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [timers, setTimers] = useState(() => {
        const savedTimers = localStorage.getItem('timers');
        return savedTimers ? JSON.parse(savedTimers) : [];
    });
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [finishedTimerIds, setFinishedTimerIds] = useState(new Set());
    const [editingTitle, setEditingTitle] = useState(null);
    const [editingDescription, setEditingDescription] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const hoursRef = useRef(null);
    const titleInputRef = useRef(null);
    const descriptionInputRef = useRef(null);

    // Saves timers to local storage
    const saveTimersToLocalStorage = (timers) => {
        localStorage.setItem('timers', JSON.stringify(timers));
    };

    // Adds a new timer
    const handleAddTimer = () => {
        const totalSeconds = 
            (parseInt(hoursInput, 10) || 0) * 3600 +
            (parseInt(minutesInput, 10) || 0) * 60 +
            (parseInt(secondsInput, 10) || 0);

        if (totalSeconds > 0 && titleInput) {
            const newTimer = {
                id: Date.now(),
                duration: totalSeconds,
                remaining: totalSeconds,
                title: titleInput,
                description: descriptionInput,
                lastUpdated: Date.now()
            };
            const updatedTimers = [newTimer, ...timers];
            setTimers(updatedTimers);
            saveTimersToLocalStorage(updatedTimers);
            setHoursInput('');
            setMinutesInput('');
            setSecondsInput('');
            setTitleInput('');
            setDescriptionInput('');
        } else {
            setPopupMessage('Please enter a valid amount of time and a title.');
            setPopupVisible(true);
        }
    };

    // Adds default timer from backend (quick timers)
    // Axios sends HTTP POST request to backend (Express server) for adding timers
    const handleAddDefaultTimer = (endpoint) => {
        axios.post(`http://localhost:5000/${endpoint}`)
            .then(response => {
                const newTimer = response.data;
                const updatedTimers = [newTimer, ...timers];
                setTimers(updatedTimers);
                saveTimersToLocalStorage(updatedTimers);
            })
            .catch(error => {
                console.error('There was an error adding the default timer!', error);
            });
    };

    // Delete a timer
    const handleDeleteTimer = (id) => {
        const updatedTimers = timers.filter(timer => timer.id !== id);
        setTimers(updatedTimers);
        saveTimersToLocalStorage(updatedTimers);
    };

    // Resets a timer
    // Focuses on Hours input
    const handleResetTimer = (id) => {
        handleDeleteTimer(id);
        setHoursInput('');
        setMinutesInput('');
        setSecondsInput('');
        hoursRef.current.focus();
    };

    // Handle key press (Enter) for adding a timer
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddTimer();
        }
    };

    // Edits timer title
    const handleEditTitle = (id) => {
        const updatedTimers = timers.map(timer => 
            timer.id === id ? { ...timer, title: newTitle } : timer
        );
        setTimers(updatedTimers);
        saveTimersToLocalStorage(updatedTimers);
        setEditingTitle(null);
        setNewTitle('');
    };

    // Edits timer description
    const handleEditDescription = (id) => {
        const updatedTimers = timers.map(timer => 
            timer.id === id ? { ...timer, description: newDescription } : timer
        );
        setTimers(updatedTimers);
        saveTimersToLocalStorage(updatedTimers);
        setEditingDescription(null);
        setNewDescription('');
    };

    // Handles key press (Enter) for editing timer title or description
    const handleEditKeyPress = (e, id, type) => {
        if (e.key === 'Enter') {
            if (type === 'title') {
                handleEditTitle(id);
            } else if (type === 'description') {
                handleEditDescription(id);
            }
        }
    };

    // Handles timer updates every second
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
                            setPopupMessage('Timer is done!');
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

    // Initializes timers on component mount
    useEffect(() => {
        const now = Date.now();
        setTimers(timers => {
            const updatedTimers = timers.map(timer => {
                const elapsed = Math.floor((now - timer.lastUpdated) / 1000);
                const remaining = timer.remaining - elapsed;
                return remaining > 0 ? { ...timer, remaining, lastUpdated: now } : { ...timer, remaining: 0, lastUpdated: now };
            });
            saveTimersToLocalStorage(updatedTimers);
            return updatedTimers;
        });
    }, []);

    // Function to close the popup
    const handleClosePopup = () => {
        setPopupVisible(false);
    };

    return (
        <>
            <AppHeader />
            <h2 className='timerHeader'>Add your special timers here <img src={downarrowcircle} alt="Down Arrow" className="downArrow" /></h2>
            <div className='timerBody'>
                <input
                    ref={hoursRef}
                    className='inputHours'
                    placeholder='Input Time in Hours'
                    value={hoursInput}
                    onChange={(e) => setHoursInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <input
                    className='inputMinutes'
                    placeholder='Input Time in Minutes'
                    value={minutesInput}
                    onChange={(e) => setMinutesInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <input
                    className='inputSeconds'
                    placeholder='Input Time in Seconds'
                    value={secondsInput}
                    onChange={(e) => setSecondsInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <input
                    className='inputTitle'
                    placeholder='Input a Title'
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <input
                    className='inputDescription'
                    placeholder='Input a Description'
                    value={descriptionInput}
                    onChange={(e) => setDescriptionInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button onClick={handleAddTimer}>Start</button>                
                <div className="quickTimerHeader">
                    <span className="quickTimerText">Quick Timers:</span>
                    <button className="quickTimerButton" onClick={() => handleAddDefaultTimer('add-24-hour-timer')}>24 Hour Timer</button>
                    <button className="quickTimerButton" onClick={() => handleAddDefaultTimer('add-12-hour-timer')}>12 Hour Timer</button>
                    <button className="quickTimerButton" onClick={() => handleAddDefaultTimer('add-1-hour-timer')}>1 Hour Timer</button>
                    <button className="quickTimerButton" onClick={() => handleAddDefaultTimer('add-1-minute-timer')}>1 Minute Timer</button>
                </div>
                <div className="timerList">
                    <div className="timerHeaderRow">
                        <div className="timerHeaderCell">Timer</div>
                        <div className="timerHeaderCell">Title</div>
                        <div className="timerHeaderCell">Description</div>
                        <div className="timerHeaderCell" style={{marginLeft: "220px"}}>Actions</div>
                    </div>
                    {timers.map(timer => (
                        <div key={timer.id} className="timerItem">
                            <div className="timerCell timer">
                                {Math.floor(timer.remaining / (3600 * 24))}d : {Math.floor((timer.remaining % (3600 * 24)) / 3600)}h : {Math.floor((timer.remaining % 3600) / 60)}m : {timer.remaining % 60}s
                            </div>
                            <div className="timerCell timerTitle">
                                {editingTitle === timer.id ? (
                                    <input 
                                        ref={titleInputRef}
                                        type="text" 
                                        value={newTitle} 
                                        onChange={(e) => setNewTitle(e.target.value)} 
                                        onBlur={() => handleEditTitle(timer.id)}
                                        onKeyPress={(e) => handleEditKeyPress(e, timer.id, 'title')}
                                        autoFocus
                                    />
                                ) : (
                                    timer.title
                                )}
                            </div>
                            <div className="timerCell timerDescription">
                                {editingDescription === timer.id ? (
                                    <input 
                                        ref={descriptionInputRef}
                                        type="text" 
                                        value={newDescription} 
                                        onChange={(e) => setNewDescription(e.target.value)} 
                                        onBlur={() => handleEditDescription(timer.id)}
                                        onKeyPress={(e) => handleEditKeyPress(e, timer.id, 'description')}
                                        autoFocus
                                    />
                                ) : (
                                    timer.description
                                )}
                            </div>
                            <div className='timerCell timerActions'>
                                <button className='actionButton' onClick={() => {setEditingTitle(timer.id); setNewTitle(timer.title);}}>Edit Title</button>
                                <button className='actionButton' onClick={() => {setEditingDescription(timer.id); setNewDescription(timer.description);}}>Edit Description</button>
                                <button className='actionIcon' onClick={() => handleResetTimer(timer.id)}><img src={TimerReset} alt="reset img" className="timerReset" /></button>
                                <button className='actionIcon' onClick={() => handleDeleteTimer(timer.id)}><img src={TimerGarbage} alt="garbage img" className="timerGarbage" /></button>
                            </div>
                        </div>
                    ))}
                </div>
                {popupVisible && (
                    <div className="popupMessage">
                        {popupMessage}
                        <button onClick={handleClosePopup}>OK</button>
                    </div>
                )}
            </div>
            <AppFooter />
        </>
    );
}
