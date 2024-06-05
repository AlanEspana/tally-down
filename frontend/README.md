# Modified by: Alan Espana
# CS 232 - Capstone II
# Final Project App - Tally Down

Tally-Down User’s Manual: 
App Dependencies: 
(Apps required to run this project) 
Visual Studios Code: https://code.visualstudio.com/download  
Node.js (includes npm): (recommended link) https://nodejs.org/en/ or 
https://nodejs.org/en/download/prebuilt-installer 
MySQL: https://dev.mysql.com/downloads/mysql/  
Initialization instructions: 
1. Download the app: 
    a. Download the app from https://github.com/AlanEspana/tally-down  
    b. Extract the ZIP file if necessary. 
2. Open the project: 
    a. Open Visual Studios Code. 
    b. Open the ‘tally-down-main’ folder inside VS Code. 
3. Set up the Backend: 
    a. Open a new terminal at the top of VS Code. 
    b. Switch to the backend directory by typing ‘cd backend’ inside the terminal. 
    c. Install back-end dependencies by typing ‘npm install’ inside the terminal. 
    d. Start the back-end development server by typing ‘npm start’ inside the 
    terminal. 
    e. Leave it open while running app. 
4. Set up the Frontend: 
    a. Open a new terminal again while leaving the last one open. 
    b. Install front-end dependencies by typing ‘npm install’ inside the terminal. 
    c. Start the front-end development server with ‘npm start’ inside the terminal 
    which will open the application. 
5. Last Step (if needed): 
    a. Set up the database with MySQL command line (currently the application 
    has an empty password): 
        i. CREATE DATABASE mydatabase; 
        ii. CREATE USER 'root'@'localhost' IDENTIFIED BY 'your_password'; 
        iii. GRANT ALL PRIVILEGES ON mydatabase.* TO 'root'@'localhost'; 
        iv. FLUSH PRIVILEGES; 
    b. Make sure the .env file in the backend is configured with your MySQL 
    database details. It is currently: 
        i. DB_HOST=localhost 
        ii. DB_USER=root 
        iii. DB_PASSWORD= 
        iv. DB_NAME=mydatabase 
6. Troubleshooting:  
    a. Errors with MySQL connection: 
        i. Ensure MySQL server is running. 
        ii. Verify the credentials of the ‘.env’ file. 
        iii. Check the error messages in the backend terminal.

# DEFAULT README BEGINS HERE-
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
