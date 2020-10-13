// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const bodyParser = require('body-parser');
const express = require('express');
// Start up an instance of app
let app = express();
/* Dependencies */
/* Middleware*/
const cors = require('cors');

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Spin up the server
const port= 8888;
const server = app.listen(port,listening)
// Callback to debug
function listening(){
    console.log('running');
    console.log(`running on localhost: ${port}`);
}
// Initialize all route with a callback function

// GET all data route
app.get('/all', getWeatherInfo);
function getWeatherInfo(req, res) {
    console.log('GET request received');
    res.send(projectData);
}

// Post Route
app.post('/add',addWeatherInfo);
function addWeatherInfo(req, res) {
    projectData['date'] = req.body.date;
    projectData['temperature'] = req.body.temp;
    projectData['user-response'] = req.body.content;
    projectData['extra'] = req.body.extraData;
    res.send(projectData);
}
