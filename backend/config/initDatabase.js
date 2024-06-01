/*
  Modified by: Alan Espana
  CS 232 - Capstone II
  Final Project App - Tally Down
  Last updated: 5/23/2024
*/

const db = require('./db');

const initDatabase = () => {
    const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS mydatabase';
    const useDatabaseQuery = 'USE mydatabase';
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS timers (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255),
            description TEXT,
            duration INT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;

    db.query(createDatabaseQuery, (err, result) => { // Creates the database if it doesn't exist.
        if (err) {
            console.error('Error creating database:', err);
            return;
        }
        db.query(useDatabaseQuery, (err, result) => { // Switches to the created database.
            if (err) {
                console.error('Error using database:', err);
                return;
            }
            db.query(createTableQuery, (err, result) => { // Creates the timers table if it doesn't exist.
                if (err) {
                    console.error('Error creating table:', err);
                    return;
                }
                console.log('Database and table initialized successfully.');
            });
        });
    });
};

module.exports = initDatabase;