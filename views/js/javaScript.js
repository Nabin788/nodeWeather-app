let cityName = document.querySelector(".location-name");
let weather = document.querySelector(".location-weather");

if(cityName.innerText === "" && !document.body.textContent.includes("Please enter city name.")){
    let div = document.createElement("div"); 
    div.classList.add("notification");
    div.innerText = "Please Enter valid city name."
    document.body.appendChild(div);
    weather.style.visibility = "hidden";
} else if (document.body.textContent.includes("Please enter city name.")){
    weather.style.visibility = "hidden";
}
