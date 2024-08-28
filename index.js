const express = require("express");
require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const { apiInfo, apiData } = require("./api.js");

const port = process.env.PORT;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const viewPath = path.join(__dirname, "./views/html");

const staticPath = path.join(__dirname, "./views");
app.use(express.static(staticPath));

app.set("view engine", "hbs");
app.set("views", viewPath);

app.get("/", (req, res) => {
    res.render("index", {
        alert: "Please enter city name.",
    });
});

app.post("/", async (req, res) => {

    try {
        const city = req.body.search;
        const data = await apiInfo(city);
        const requireApi = await apiData(data);

        let { winds, dateFormated, humidity, pressure, weatherDay, weatherIcon, feelsLike, minTemp, maxTemp, country, name } = requireApi;

        res.render("index", {
            cityName: `${name},`,
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

    } catch (err) {
        console.log(err);
        res.render("index", { error: "Unable to fetch weather data. Please try again later." });
    }

});

app.listen(port, () => {
    console.log(`server is listening from port number:`, port);
});