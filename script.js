const weatherForm = document.querySelector(".inputs");
const cityInput = document.querySelector(".searchRegion");
const weather = document.querySelector(".weather");
const APIKEY = "1aaa9b6add2971f7ac82dfdcff377c98";

weatherForm.addEventListener('submit',  async event =>{
    event.preventDefault();

    const city = cityInput.value

    if(city){
        try{
            const weatherdata = await getWeatherData(city);
            displayWeatherInfo(weatherdata)
        }
        catch(error){
            console.error(error)
            displayError(error)
        }
    }
    else{
        displayError("Please insert a city")
    }
})

async function getWeatherData(city){

    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`
    const response = await fetch(apiurl)
    
    if(!response.ok){
        throw new Error("Could not find City")
    }

    return await response.json()
}

function displayWeatherInfo(data){
    let {name:city,
           main:{temp,humidity}} = data;

    weather.textContent = ""
    weather.style.display = "flex"

    const cityDisplay = document.createElement("h1")
    const tempDisplay = document.createElement("p")
    const humidityDisplay = document.createElement("p")

    cityDisplay.textContent =  city;
    weather.appendChild(cityDisplay)
    
    temp = temp-273
    tempDisplay.textContent = "The temperature: " + temp + "Celsius";
    weather.appendChild(tempDisplay)

    humidityDisplay.textContent = "The humidity: " + humidity;
    weather.appendChild(humidityDisplay)
}

function displayError(message){
    const errorDisplay = document.createElement("p")
    errorDisplay.textContent = message;

    weather.textContent = ""
    weather.style.display = "flex"
    weather.appendChild(errorDisplay)
}