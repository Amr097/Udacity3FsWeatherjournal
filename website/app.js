/* Global Variables */
const apiKey = "1f0c4ba0129dbb2d5198dca861e5af8d";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();

//Main functions start//

//Generate entries function
const generateEntries = (e) => {
  e.preventDefault();

  const zipId = document.getElementById("zip");
  const feelings = document.getElementById("feelings");

  if (!(zipId && feelings && zipId.value && feelings.value)) {
    alert("Please fill all inputs before submitting");
    return;
  } else {
    getWeather(zip.value).then((res) => {
      if (res.cod !== 200) {
        alert("Failed to get country weather");
        return;
      }
      const temp = res.main.temp;
      const data = {
        temp,
        content: feelings.value,
        date: newDate,
      };

      postData(data).then((res) => {
        //Handles server error cases
        if (res.status === 500) alert(res.error);

        if (res.status === 200) {
          getAllData().then((res) => {
            const { content, date, temp } = res;

            // Write updated data to DOM elements
            document.getElementById("temp").innerHTML =
              Math.round(temp) + " " + "degrees";
            document.getElementById("content").innerHTML = content;
            document.getElementById("date").innerHTML = date;
          });
        }
      });
    });
  }
};

//Main functions end//

//Helper functions start//

//Get weather function
const getWeather = async (zip, country = "us") => {
  try {
    const response = await fetch(
      `${baseUrl}?zip=${zip},${country}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    alert("Error fetching the weather data");
    console.error("Error fetching the weather data:", error);
  }
};

// Function to get all project data from the server
const getAllData = async () => {
  try {
    // Make a GET request to the server to get the projectData
    const response = await fetch("http://localhost:3000/all");

    // Convert response to JSON
    const data = await response.json();

    return data;
  } catch (error) {
    alert("Failed to get data from server");
  }
};

// Function to POST data to the server
const postData = async (data = {}) => {
  try {
    const response = await fetch("http://localhost:3000/add", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Convert the data object to a JSON string
    });

    const newData = await response.json(); // Convert response to JSON
    return newData;
  } catch (error) {
    alert("Failed to add data to the server");
  }
};

//Helper functions end//
