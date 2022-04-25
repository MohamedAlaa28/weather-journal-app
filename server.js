// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));
const  port = 8000;
//creating function to print when the server run and print the number of the port
const server = app.listen(port, listening);

function listening() {
  console.log("server is running");
  console.log(`running on the localhost: ${port}`);
}

// Setup Server
//get function in the server side
app.get("/", function (req, res) {
    res.send(projectData);
  })
//post function in the servreside
app.post("/", addWeather);

function addWeather(req, res) {
  //create object to contain all data
  newObj = {
   date : req.body.date,
   temp : req.body.temperature,
   fell : req.body.feeling
  }
  
  projectData = newObj; 
  console.log("new Object:", projectData);
  res.send(newObj);
}

app.get("/getWeather", function (req, res) {
  res.send(projectData);
})