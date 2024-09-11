// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server

// Define the port the server will listen on
const port = 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// GET route to send projectData to the client
app.get("/all", (req, res) => {
  res.send(projectData);
});

// POST route to receive and store data in projectData
app.post("/add", (req, res) => {
  try {
    const { temp, date, content } = req.body;

    // Validate that required data is present
    if (!temp || !date || !content) {
      throw new Error("Missing required data");
    }

    projectData = {
      temp,
      date,
      content,
    };

    // Send a success response with status 200
    res.status(200).send({ projectData, status: 200 });
  } catch (error) {
    res.status(500).send({
      error: "An error occurred while processing your request",
      status: 500,
    });
  }
});

module.exports = app;
