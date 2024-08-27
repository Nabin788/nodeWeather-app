const express = require("express");
require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const { apiInfo, apiData } = require("./api.js");

const port = process.env.PORT;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


// chnaging the default view path because index is within a htm folder
const viewPath = path.join(__dirname, "./views/html");

// to acces static file like css, js
// using middleware
const staticPath = path.join(__dirname, "./views");
app.use(express.static(staticPath));

// initialize template engine
app.set("view engine", "hbs");
// relocated views to viewPath
app.set("views", viewPath);

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/", (req, res) => {
    const city = req.body.search;
    apiInfo(city).then(data => {
        let { name } = data;
        let myCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

        // City found, get weather data
        apiData(data).then(requireData => {
            let { winds, dateFormated, humidity, pressure, weatherDay, weatherIcon, feelsLike, minTemp, maxTemp, country } = requireData;

            res.render("index", {
                cityName: city,
                country: country,
                Date: dateFormated,
                clouds: weatherDay,
                icons: weatherIcon,
                minTemp: minTemp,
                maxTemp: maxTemp,
                feelsLike: feelsLike,
                humidity: humidity,
                pressure: pressure,
                wind: winds,
            });
            if (myCity !== name) {
                // City not found
                return res.render("index", {
                    cityName: "city not found",
                    country: "",
                    Date: "",
                    clouds: "",
                    icons: "",
                    minTemp: "",
                    maxTemp: "",
                    feelsLike: "",
                    humidity: "",
                    pressure: "",
                    wind: "",
                });
            }
        }).catch(err => {
            // Handle errors from apiData
            console.error(err);
            res.status(500).send("Internal Server Error");
        });
    }).catch(err => {
        // Handle errors from apiInfo
        console.error(err);
        res.status(500).send("Internal Server Error");
    });
});


app.listen(port, () => {
    console.log(`server is listening from port number:`, port);
});