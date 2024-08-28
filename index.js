const express = require("express"); // Importing the Express framework
require("dotenv").config(); // Loading environment variables from .env file
const path = require("path"); // Importing path module for handling file paths
const bodyParser = require("body-parser"); // Importing body-parser middleware for parsing request bodies
const { apiInfo, apiData } = require("./api.js"); // Importing custom API functions

const port = process.env.PORT; // Getting the port number from environment variables

const app = express(); // Creating an Express application instance

app.use(bodyParser.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

const viewPath = path.join(__dirname, "./views/html"); // Defining the path for view templates

const staticPath = path.join(__dirname, "./views"); // Defining the path for static files
app.use(express.static(staticPath)); // Serving static files from the defined path

app.set("view engine", "hbs"); // Setting Handlebars as the view engine
app.set("views", viewPath); // Setting the path for views directory

// Route for the home page
app.get("/", (req, res) => {
    res.render("index", { // Rendering the index view with a prompt message
        alert: "Please enter city name.",
    });
});

// Route to handle form submission
app.post("/", async (req, res) => {
    try {
        const city = req.body.search; // Getting the city name from the form submission
        const data = await apiInfo(city); // Fetching API info based on the city name
        const requireApi = await apiData(data); // Fetching required data from the API response

        let { winds, humidity, pressure, weatherDay, weatherIcon, feelsLike, minTemp, maxTemp, country, name, currTime} = requireApi; // Destructuring data for rendering

        res.render("index", { // Rendering the index view with weather data
            cityName: `${name},`,
            country: country,
            Date: currTime,
            clouds: weatherDay,
            icons: weatherIcon,
            minTemp: minTemp,
            maxTemp: maxTemp,
            feelsLike: feelsLike,
            humidity: humidity,
            pressure: pressure,
            wind: winds,
        });

    } catch (err) {
        console.log(err); // Logging any errors to the console
        res.render("index", { error: "Unable to fetch weather data. Please try again later." }); // Rendering the view with an error message
    }
});

app.listen(port, () => {
    console.log(`server is listening from port number:`, port); // Logging the port number the server is listening on
});
