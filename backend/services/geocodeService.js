const {addLog} = require("../logs/apiLogs");

const axios = require("axios");

async function getCoordinates(city){
    startTime = Date.now();
    try{
        const response = await axios.get(
            'https://api.opencagedata.com/geocode/v1/json',
            {
                params:{
                    q:city, 
                    key: process.env.GEOCODE_API_KEY
                }
            }
        );
        const duration = Date.now() - startTime;
        const location = response.data.results[0].geometry;
        addLog({
            service: "Map geocode",
            status: response.status,
            latency: duration
        });

        return {
            lat: location.lat,
            lon: location.lng
        };
    }catch(error){
        const duration = Date.now()-startTime;
        addLog({
            service: "Map geocode",
            status: error.response.status,
            latency: duration,
            error: true
        });
    }
    
}

module.exports = {getCoordinates};