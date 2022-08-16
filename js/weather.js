const API = "0f19516defde52e001b3416c1ed2e6b2"
const cityBox = document.querySelector(".city");
const weatherBox = document.querySelector(".weather");
function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&units=metric`
    fetch(url).then((response) => response.json())
    .then((data) => {
        const city = data.name;
        const country = data.sys.country;
        const temp = data.main.temp;
        const weather = data.weather[0].description;

        cityBox.innerText = `${city} ${country}`
        weatherBox.innerText = `${temp} ${weather}`
    });
}

function onGeoError(){
    alert("위치를 찾을수없습니다.")
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);