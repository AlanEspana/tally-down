/*
  Modified by: Alan Espana
  CS 232 - Capstone II
  Final Project App - Tally Down
  Last updated: 5/23/2024
*/

export const calculateEndDate = (remaining) => {
    const endDate = new Date(Date.now() + remaining * 1000);
    return endDate.toLocaleDateString(); // Only returns the date in locale format
};

export const saveTimersToLocalStorage = (timers) => {
    localStorage.setItem('timers', JSON.stringify(timers));
};

export const getTimersFromLocalStorage = () => {
    const savedTimers = localStorage.getItem('timers');
    return savedTimers ? JSON.parse(savedTimers) : [];
};