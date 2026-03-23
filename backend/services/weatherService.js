const axios = require("axios");
const {addLog} = require("../logs/apiLogs");

async function getWeather(lat, lon){
    const startTime = Date.now();
    try{
        const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
            params:{
                lat,lon,
                appid: process.env.OPENWEATHER_API_KEY,
                units: "imperial"
            }
        }
        );
        const data = response.data;
        const duration = Date.now()-startTime;
        addLog({
            service: "Weather",
            status: response.status,
            latency: duration
        });
        return{
            temperature: data.main.temp,
            humidity: data.main.humidity,
            description: data.weather[0].description
        };
    } catch(error){
        const duration = Date.now()-startTime;
        addLog({
            service: "Weather",
            status: error.response.status,
            latency: duration,
            error: true
        });

    }


}

module.exports = {getWeather};