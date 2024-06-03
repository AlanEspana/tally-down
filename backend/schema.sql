/*
  Modified by: Alan Espana
  CS 232 - Capstone II
  Final Project App - Tally Down
  Last updated: 5/23/2024
*/

/* Used to manually set up the database schema when a future database instance is created */

CREATE DATABASE mydatabase;
USE mydatabase;

CREATE TABLE timers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    duration INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);