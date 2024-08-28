let cityName = document.querySelector(".location-name");
let weather = document.querySelector(".location-weather");

if(cityName.innerText === ""){
    let div = document.createElement("div"); 
    div.classList.add("notification");
    div.innerText = "Please Enter valid city name."
    document.body.appendChild(div);

    weather.style.visibility = "hidden";
}