# Weather-Journal App Project

## Overview

This project is a web-based weather journal application that allows users to enter a ZIP code and their current feelings. It fetches weather data from the OpenWeatherMap API based on the ZIP code and updates the user interface (UI) dynamically with the weather data and user inputs. This project demonstrates the use of asynchronous JavaScript, Web APIs, and client-server communication with GET and POST requests using Express.js.

## Project Structure

The project includes the following main files:

- `index.html`: Contains the structure of the webpage.
- `style.css`: Provides the styling for the webpage.
- `app.js`: Client-side JavaScript that handles user input, API calls, and UI updates.
- `server.js`: Server-side JavaScript that uses Express to handle GET and POST requests.
- `tests.js`: A template file to run some basic tests for our code.

## How It Works

1. **User Input**
   - The user enters a ZIP code and their feelings into the input fields in the UI.
   - Once the user clicks the **Generate** button, the app makes a call to the OpenWeatherMap API to fetch the weather data for the entered ZIP code.
2. **Fetching Weather Data**
   - The app uses the `fetch` API to send a GET request to the OpenWeatherMap API using the entered ZIP code.
   - The weather data returned by the API (specifically the temperature) is then combined with the user’s input (feelings) and the current date to form an object.
3. **Storing Data**
   - This object is sent to the server using a POST request. The server stores this data in the `projectData` object.
4. **Updating the UI**
   - After the server stores the data, the client makes a GET request to retrieve the `projectData` object.
   - The UI is updated with the retrieved data, displaying the temperature, date, and the user's feelings.

## How to Run the Project

### 1. Clone the repository

First, clone this repository to your local machine.

```bash
git clone https://github.com/your-repository/weather-journal-app.git
```

### 2. Install Dependencies

Navigate to the project directory and install the required dependencies using npm.

```bash
cd weather-journal-app
npm install
```

### 3. Start the Server

To start the Express server, run:

```bash
node server.js
```

### 4. Open the Application

Open your browser and go to http://localhost:3000 to use the application.
