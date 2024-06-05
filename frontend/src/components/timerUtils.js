/*
  Modified by: Alan Espana
  CS 232 - Capstone II
  Final Project App - Tally Down
  Last updated: 5/23/2024
*/
// Made with https://chat.openai.com/chat 
// Utility functions for handling timer operations

// Calculates the end date based on remaining time
export const calculateEndDate = (remaining) => {
    const endDate = new Date(Date.now() + remaining * 1000);
    return endDate.toLocaleDateString(); // Returns date in locale format
};

// Save timers to local storage
export const saveTimersToLocalStorage = (timers) => {
    localStorage.setItem('timers', JSON.stringify(timers));
};

// Get timers from local storage
export const getTimersFromLocalStorage = () => {
    const savedTimers = localStorage.getItem('timers');
    return savedTimers ? JSON.parse(savedTimers) : [];
};