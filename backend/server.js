/*
  Modified by: Alan Espana
  CS 232 - Capstone II
  Final Project App - Tally Down
  Last updated: 5/23/2024
*/
// Made with https://chat.openai.com/chat
// MySQL with Express https://www.youtube.com/watch?v=Q3ixb1w-QaY&t=98s

const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const initDatabase = require('./config/initDatabase');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize database
initDatabase();

// Function adds default timer
const addDefaultTimer = (title, description, duration, res) => {
    const query = 'INSERT INTO timers (title, description, duration) VALUES (?, ?, ?)';
    db.query(query, [title, description, duration], (err, result) => {
        if (err) {
            return res.status(500).send('Error adding default timer');
        }
        res.status(200).send({
            id: result.insertId,
            title,
            description,
            duration,
            remaining: duration,
            lastUpdated: Date.now()
        });
    });
};

// Adds a custom timer
// inserts a new timer into MySQL database.
app.post('/add-timer', (req, res) => {
    const { title, description, duration } = req.body;
    const query = 'INSERT INTO timers (title, description, duration) VALUES (?, ?, ?)';
    db.query(query, [title, description, duration], (err, result) => {
        if (err) {
            return res.status(500).send('Error adding timer');
        }
        res.status(200).send({
            id: result.insertId,
            title,
            description,
            duration,
            remaining: duration,
            lastUpdated: Date.now()
        });
    });
});

// Endpoints add default timers
app.post('/add-24-hour-timer', (req, res) => {
    addDefaultTimer('24 Hour Timer', 'This is a default 24 hour long timer', 86400, res);
});

app.post('/add-12-hour-timer', (req, res) => {
    addDefaultTimer('12 Hour Timer', 'This is a default 12 hour long timer', 43200, res);
});

app.post('/add-1-hour-timer', (req, res) => {
    addDefaultTimer('1 Hour Timer', 'This is a default 1 hour long timer', 3600, res);
});

app.post('/add-1-minute-timer', (req, res) => {
    addDefaultTimer('1 Minute Timer', 'This is a default 1 minute long timer', 60, res);
});

const PORT = 5000; // Use port 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});