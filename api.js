let apiKey = process.env.api_key;

const apiData = async (data, res) => {
    let { main, weather, sys, wind, name, dt } = data;

    let cityDate = new Date(dt * 1000);
    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    let currTime = new Intl.DateTimeFormat('en-US', dateOptions).format(cityDate);

    // extract weather day and icon
    let weatherDay = weather[0].main;
    let weatherIcon = weather[0].icon;

    // extract temp . pressure and humidity
    let { feels_like, pressure, humidity, temp_min, temp_max } = main;
    let feelsLike = (feels_like - 273.15).toFixed(2);

    let minTemp = (temp_min - 273.15).toFixed(1);
    let maxTemp = (temp_max - 273.15).toFixed(1);

    // extract wind
    let winds = wind.speed;

    // extract country
    let countryCode = sys.country;
    let countryName = new Intl.DisplayNames(['es'], { type: 'region' });
    let country = countryName.of(countryCode);

    const weatherdata = { winds, humidity, pressure, weatherDay, weatherIcon, feelsLike, minTemp, maxTemp, country, name, currTime };

    return weatherdata;
}

const apiInfo = async (city, defaultCity) => {
    try {
        let api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        let data = await api.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { apiInfo, apiData };
